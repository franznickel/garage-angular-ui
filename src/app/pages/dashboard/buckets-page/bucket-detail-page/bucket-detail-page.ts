import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../../../../services/bucket.service';

@Component({
  selector: 'app-bucket-detail-page',
  imports: [CommonModule],
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
}
