import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BucketService } from '../../../services/bucket.service';

@Component({
  selector: 'app-buckets-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './buckets-page.html',
  styleUrl: './buckets-page.css',
})
export class BucketsPage implements OnInit {
  private bucketService = inject(BucketService);

  buckets$ = this.bucketService.buckets$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.bucketService.refresh().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
