import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InfoCardComponent } from '../../../../components/info-card-component/info-card-component';
import { RefreshButtonComponent } from '../../../../components/refresh-button-component/refresh-button-component';
import { BucketCardComponent } from '../../../../components/bucket-card-component/bucket-card-component';
import { GarageDataService } from '../../../../services/garage-data.service';

@Component({
  selector: 'app-key-detail-page',
  imports: [CommonModule, InfoCardComponent, RefreshButtonComponent, BucketCardComponent],
  templateUrl: './key-detail-page.html',
  styleUrl: './key-detail-page.css',
})
export class KeyDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private garageDataService = inject(GarageDataService);

  key$ = this.garageDataService.getKeyDetail$(this.route.snapshot.params['id']);
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.getKeyDetail(this.route.snapshot.params['id']).subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
