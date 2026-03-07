import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GarageDataService } from './garage-data.service';
import { AccessKeyApiService, CreateKeyRequest, UpdateKeyRequestBody, GetKeyInfoResponse,
  ListKeysResponse } from '../generated/';

@Injectable({ providedIn: 'root' })
export class KeyService {
  private data = inject(GarageDataService);
  private accessKeyApi = inject(AccessKeyApiService);

  readonly keys$ = this.data.keys$;

  refresh(): Observable<ListKeysResponse> {
    return this.data.refreshKeys();
  }

  getKeyDetail(id: string): Observable<GetKeyInfoResponse> {
    return this.data.getKeyDetail(id);
  }

  getKeyDetail$(id: string): Observable<GetKeyInfoResponse | null> {
    return this.data.getKeyDetail$(id);
  }

  createKey(body: CreateKeyRequest): Observable<ListKeysResponse> {
    return this.accessKeyApi.createKey({ body }).pipe(
      switchMap(() => this.data.refreshKeys())
    );
  }

  deleteKey(id: string): Observable<ListKeysResponse> {
    return this.accessKeyApi.deleteKey({ id }).pipe(
      switchMap(() => this.data.refreshKeys())
    );
  }

  updateKey(id: string, body: UpdateKeyRequestBody): Observable<GetKeyInfoResponse> {
    return this.accessKeyApi.updateKey({ id, body }).pipe(
      switchMap(() => this.data.getKeyDetail(id))
    );
  }

  getKeyInfoWithSecret(id: string): Observable<GetKeyInfoResponse> {
    return this.accessKeyApi.getKeyInfo({ id, showSecretKey: true });
  }
}
