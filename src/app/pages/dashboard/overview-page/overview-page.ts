import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { NodeCardComponent } from '../../../components/node-card-component/node-card-component';
import { GarageDataService } from '../../../services/garage-data.service';

@Component({
  selector: 'app-overview-page',
  imports: [CommonModule, RefreshButtonComponent, NodeCardComponent],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.css',
})
export class OverviewPage implements OnInit {
  private garageDataService = inject(GarageDataService);

  status$ = this.garageDataService.clusterStatus$;
  health$ = this.garageDataService.clusterHealth$;
  layout$ = this.garageDataService.clusterLayout$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshCluster().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
