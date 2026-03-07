import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GarageDataService } from './garage-data.service';
import { BucketApiService, BucketAliasApiService, PermissionApiService, CreateBucketRequest, UpdateBucketRequestBody,
  BucketAliasEnum, AllowBucketKeyRequest, DenyBucketKeyRequest, GetBucketInfoResponse, ListBucketsResponse,
  AddBucketAliasResponse, RemoveBucketAliasResponse, AllowBucketKeyResponse, DenyBucketKeyResponse,
  CleanupIncompleteUploadsResponse } from '../generated/';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private data = inject(GarageDataService);
  private bucketApi = inject(BucketApiService);
  private bucketAliasApi = inject(BucketAliasApiService);
  private permissionApi = inject(PermissionApiService);

  readonly buckets$ = this.data.buckets$;

  refresh(): Observable<ListBucketsResponse> {
    return this.data.refreshBuckets();
  }

  getBucketDetail(id: string): Observable<GetBucketInfoResponse> {
    return this.data.getBucketDetail(id);
  }

  getBucketDetail$(id: string): Observable<GetBucketInfoResponse | null> {
    return this.data.getBucketDetail$(id);
  }

  createBucket(body: CreateBucketRequest): Observable<ListBucketsResponse> {
    return this.bucketApi.createBucket({ body }).pipe(
      switchMap(() => this.data.refreshBuckets())
    );
  }

  deleteBucket(id: string): Observable<ListBucketsResponse> {
    return this.bucketApi.deleteBucket({ id }).pipe(
      switchMap(() => this.data.refreshBuckets())
    );
  }

  updateBucket(id: string, body: UpdateBucketRequestBody): Observable<GetBucketInfoResponse> {
    return this.bucketApi.updateBucket({ id, body }).pipe(
      switchMap(() => this.data.getBucketDetail(id))
    );
  }

  addAlias(body: BucketAliasEnum): Observable<AddBucketAliasResponse> {
    return this.bucketAliasApi.addBucketAlias({ body });
  }

  removeBucketAlias(body: BucketAliasEnum): Observable<RemoveBucketAliasResponse> {
    return this.bucketAliasApi.removeBucketAlias({ body });
  }

  allowKey(body: AllowBucketKeyRequest): Observable<AllowBucketKeyResponse> {
    return this.permissionApi.allowBucketKey({ body });
  }

  denyKey(body: DenyBucketKeyRequest): Observable<DenyBucketKeyResponse> {
    return this.permissionApi.denyBucketKey({ body });
  }

  cleanupIncompleteUploads(bucketId: string, olderThanSecs: number): Observable<CleanupIncompleteUploadsResponse> {
    return this.bucketApi.cleanupIncompleteUploads({
      body: { bucketId, olderThanSecs }
    });
  }
}
