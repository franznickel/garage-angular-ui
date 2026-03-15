import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { BucketCardComponent } from '../../../components/bucket-card-component/bucket-card-component';
import { GarageDataService } from '../../../services/garage-data.service';

@Component({
  selector: 'app-buckets-page',
  imports: [CommonModule, RefreshButtonComponent, BucketCardComponent],
  templateUrl: './buckets-page.html',
  styleUrl: './buckets-page.css',
})
export class BucketsPage implements OnInit {
  private garageDataService = inject(GarageDataService);

  buckets$ = this.garageDataService.buckets$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshBuckets().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
