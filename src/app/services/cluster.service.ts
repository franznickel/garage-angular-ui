import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GarageDataService } from './garage-data.service';
import { ClusterApiService, ClusterLayoutApiService, ConnectClusterNodesRequest, ApplyClusterLayoutRequest,
  UpdateClusterLayoutRequest, ApplyClusterLayoutResponse, UpdateClusterLayoutResponse,
  ConnectClusterNodesResponse, GetClusterLayoutResponse, GetClusterStatusResponse,
  GetClusterHealthResponse } from '../generated/';

@Injectable({ providedIn: 'root' })
export class ClusterService {
  private data = inject(GarageDataService);
  private clusterApi = inject(ClusterApiService);
  private clusterLayoutApi = inject(ClusterLayoutApiService);

  readonly status$ = this.data.clusterStatus$;
  readonly health$ = this.data.clusterHealth$;
  readonly layout$ = this.data.clusterLayout$;

  refresh(): Observable<{
    status: GetClusterStatusResponse;
    health: GetClusterHealthResponse;
    layout: GetClusterLayoutResponse;
  }> {
    return this.data.refreshCluster();
  }

  refreshLayout(): Observable<GetClusterLayoutResponse> {
    return this.data.refreshLayout();
  }

  connectNodes(body: ConnectClusterNodesRequest): Observable<ConnectClusterNodesResponse> {
    return this.clusterApi.connectClusterNodes({ body });
  }

  updateLayout(body: UpdateClusterLayoutRequest): Observable<UpdateClusterLayoutResponse> {
    return this.clusterLayoutApi.updateClusterLayout({ body }).pipe(
    );
  }

  applyLayout(body: ApplyClusterLayoutRequest): Observable<ApplyClusterLayoutResponse> {
    return this.clusterLayoutApi.applyClusterLayout({ body }).pipe(
    );
  }
}
