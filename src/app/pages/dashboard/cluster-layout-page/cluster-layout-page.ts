import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { InfoCardComponent } from '../../../components/info-card-component/info-card-component';
import { RoleCardComponent } from '../../../components/role-card-component/role-card-component';
import { switchMap } from 'rxjs';
import { GarageDataService } from '../../../services/garage-data.service';
import { ClusterLayoutApiService, UpdateClusterLayoutRequest, NodeRoleChangeRequest, ApplyClusterLayoutRequest } from '../../../generated/';
import { HttpErrorResponse } from '@angular/common/http';

interface NodeConfig {
  id: string;
  hostname: string;
  addr: string;
  zone: string;
  capacityGb: number;
  tagsRaw: string;
}

@Component({
  selector: 'app-cluster-layout-page',
  imports: [AsyncPipe, FormsModule, RefreshButtonComponent, InfoCardComponent, DecimalPipe, RoleCardComponent],
  templateUrl: './cluster-layout-page.html',
  styleUrl: './cluster-layout-page.css',
})
export class ClusterLayoutPage implements OnInit {
  private garageDataService = inject(GarageDataService);
  private clusterLayoutApi = inject(ClusterLayoutApiService);
  private cdr = inject(ChangeDetectorRef);

  layout$ = this.garageDataService.clusterLayout$;

  isLoading = false;
  setupOpen = false;
  isSubmitting = false;
  setupError = '';
  zoneRedundancy = 1;
  nodeConfigs: NodeConfig[] = [];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshLayout().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }

  openSetupDialog(): void {
    this.load();
    const status = this.garageDataService.getClusterStatusSnapshot();
    // @ts-ignore
    this.nodeConfigs = (status?.nodes ?? []).map(node => ({
      id: node.id,
      hostname: node.hostname,
      addr: node.addr,
      zone: node.role?.zone ?? 'dc1',
      capacityGb: node.role?.capacity ? Math.floor(node.role.capacity / 1_000_000_000) : 100,
      tagsRaw: node.role?.tags?.join(', ') ?? '',
    }));
    this.zoneRedundancy = 1;
    this.setupError = '';
    this.setupOpen = true;
  }

  closeSetupDialog(): void {
    this.setupOpen = false;
    this.setupError = '';
  }

  submitSetup(currentVersion: number): void {
    if (this.nodeConfigs.some(n => !n.zone || n.capacityGb < 1)) {
      this.setupError = 'Bitte Zone und Kapazität für alle Nodes angeben.';
      return;
    }

    this.isSubmitting = true;
    this.setupError = '';

    const roles: NodeRoleChangeRequest[] = this.nodeConfigs.map(n => ({
      id: n.id,
      zone: n.zone,
      capacity: n.capacityGb * 1_000_000_000,
      tags: n.tagsRaw ? n.tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
    }));

    const updateClusterLayoutRequest: UpdateClusterLayoutRequest = {
      roles: roles,
      parameters: { zoneRedundancy: { atLeast: this.zoneRedundancy } },
    };

    const applyClusterLayoutRequest: ApplyClusterLayoutRequest = {
      version: currentVersion + 1,
    };

    this.clusterLayoutApi.updateClusterLayout({
      body: updateClusterLayoutRequest,
    }).pipe(
      switchMap(() => this.clusterLayoutApi.applyClusterLayout({ body: applyClusterLayoutRequest })),
      switchMap(() => this.garageDataService.refreshLayout()),
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.setupOpen = false;
        this.cdr.detectChanges();
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 400) {
          this.setupError = 'Ungültige Konfiguration. Eingaben prüfen.';
        } else if (e.status === 409) {
          this.setupError = 'Versionskonfikt. Bitte die Seite neu laden.';
        } else {
          this.setupError = 'Fehler beim Erstellen des Layouts.';
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
    });
  }
}
