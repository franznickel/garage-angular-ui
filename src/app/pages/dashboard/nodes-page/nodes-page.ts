import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeCardComponent } from '../../../components/node-card-component/node-card-component';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { FormsModule } from '@angular/forms';
import { GarageDataService } from '../../../services/garage-data.service';
import { ClusterApiService } from '../../../generated/';

@Component({
  selector: 'app-nodes-page',
  imports: [CommonModule, NodeCardComponent, RefreshButtonComponent, FormsModule],
  templateUrl: './nodes-page.html',
  styleUrl: './nodes-page.css',
})
export class NodesPage implements OnInit {
  private garageDataService = inject(GarageDataService);
  private clusterApi = inject(ClusterApiService);
  private cdr = inject(ChangeDetectorRef);

  status$ = this.garageDataService.clusterStatus$;

  isLoading = false;
  connectOpen = false;
  isConnecting = false;
  connectAddress = '';
  connectError = '';
  connectSuccess = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshClusterStatus().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }

  toggleConnectPanel(): void {
    this.load();
    this.connectOpen = !this.connectOpen;
    this.connectAddress = '';
    this.connectError = '';
    this.connectSuccess = false;
  }

  submitConnect(): void {
    if (!this.connectAddress.trim()) {
      this.connectError = 'Bitte eine Node-Adresse eingeben.';
      return;
    }

    this.isConnecting = true;
    this.connectError = '';
    this.connectSuccess = false;

    this.clusterApi.connectClusterNodes({ body: [this.connectAddress.trim()] }).subscribe({
      next: (response) => {
        const anyFailed = response.some(r => !r.success);
        if (anyFailed) {
          this.connectError = 'Verbindung fehlgeschlagen. Adresse oder Node ID prüfen.';
          this.isConnecting = false;
          this.cdr.detectChanges();
          return;
        }
        this.garageDataService.refreshCluster().subscribe({
          next: () => {
            this.isConnecting = false;
            this.connectSuccess = true;
            this.connectAddress = '';
            this.cdr.detectChanges();
          },
          error: () => {
            this.isConnecting = false;
            this.connectSuccess = true; // Node verbunden, nur Refresh fehlgeschlagen
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.connectError = 'Verbindung fehlgeschlagen. Adresse oder Node ID prüfen.';
        this.isConnecting = false;
        this.cdr.detectChanges();
      },
    });
  }
}
