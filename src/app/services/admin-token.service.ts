import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GarageDataService } from './garage-data.service';
import { AdminApiTokenApiService, GetCurrentAdminTokenInfoResponse, UpdateAdminTokenRequestBody,
  ListAdminTokensResponse, GetAdminTokenInfoResponse } from '../generated/';

@Injectable({ providedIn: 'root' })
export class AdminTokenService {
  private data = inject(GarageDataService);
  private adminTokenApi = inject(AdminApiTokenApiService);

  readonly adminTokens$ = this.data.adminTokens$;

  refresh(): Observable<ListAdminTokensResponse> {
    return this.data.refreshAdminTokens();
  }

  getCurrentTokenInfo(): Observable<GetCurrentAdminTokenInfoResponse> {
    return this.adminTokenApi.getCurrentAdminTokenInfo();
  }

  getTokenInfo(id: string): Observable<GetAdminTokenInfoResponse> {
    return this.adminTokenApi.getAdminTokenInfo({ id });
  }

  createToken(body: UpdateAdminTokenRequestBody): Observable<ListAdminTokensResponse> {
    return this.adminTokenApi.createAdminToken({ body }).pipe(
      switchMap(() => this.data.refreshAdminTokens())
    );
  }

  updateToken(id: string, body: UpdateAdminTokenRequestBody): Observable<ListAdminTokensResponse> {
    return this.adminTokenApi.updateAdminToken({ id, body }).pipe(
      switchMap(() => this.data.refreshAdminTokens())
    );
  }

  deleteToken(id: string): Observable<ListAdminTokensResponse> {
    return this.adminTokenApi.deleteAdminToken({ id }).pipe(
      switchMap(() => this.data.refreshAdminTokens())
    );
  }
}
