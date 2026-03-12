import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterService } from '../../../services/cluster.service';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import {RouterLink} from '@angular/router';
import {NodeCardComponent} from '../../../components/node-card-component/node-card-component';

@Component({
  selector: 'app-overview-page',
  imports: [CommonModule, RefreshButtonComponent, RouterLink, NodeCardComponent],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.css',
})
export class OverviewPage implements OnInit {
  private clusterService = inject(ClusterService);

  status$ = this.clusterService.status$;
  health$ = this.clusterService.health$;
  layout$ = this.clusterService.layout$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.clusterService.refresh().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
