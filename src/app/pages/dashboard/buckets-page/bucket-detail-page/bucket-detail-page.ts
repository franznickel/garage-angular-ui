import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../../../../services/bucket.service';
import {RefreshButtonComponent} from '../../../../components/refresh-button-component/refresh-button-component';
import {InfoCardComponent} from '../../../../components/info-card-component/info-card-component';
import {KeyCardComponent} from '../../../../components/key-card-component/key-card-component';

@Component({
  selector: 'app-bucket-detail-page',
  imports: [CommonModule, RefreshButtonComponent, InfoCardComponent, KeyCardComponent],
  templateUrl: './bucket-detail-page.html',
  styleUrl: './bucket-detail-page.css',
})
export class BucketDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private bucketService = inject(BucketService);

  bucket$ = this.bucketService.getBucketDetail$(this.route.snapshot.params['id']);
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.bucketService.getBucketDetail(this.route.snapshot.params['id']).subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }

  formatBytes(bytes: number): string {
    if (!bytes) return '0 B';

    const units = ['B','KB','MB','GB','TB'];
    let i = 0;

    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }

    return bytes.toFixed(1) + ' ' + units[i];
  }
}
