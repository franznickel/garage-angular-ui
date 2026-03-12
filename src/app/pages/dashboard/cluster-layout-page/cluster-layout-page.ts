import { Component, inject, OnInit } from '@angular/core';
import { ClusterService } from '../../../services/cluster.service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { InfoCardComponent } from '../../../components/info-card-component/info-card-component';
import { RoleCardComponent } from '../../../components/role-card-component/role-card-component';

@Component({
  selector: 'app-cluster-layout-page',
  imports: [
    AsyncPipe,
    RefreshButtonComponent,
    InfoCardComponent,
    DecimalPipe,
    RoleCardComponent
  ],
  templateUrl: './cluster-layout-page.html',
  styleUrl: './cluster-layout-page.css',
})
export class ClusterLayoutPage implements OnInit {
  private clusterService = inject(ClusterService);

  layout$ = this.clusterService.layout$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.clusterService.refreshLayout().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }

  protected openSetupDialog() {

  }
}
