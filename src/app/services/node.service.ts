import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeApiService, MultiResponseLocalGetNodeStatisticsResponse, MultiResponseLocalGetNodeInfoResponse,
  WorkerApiService, MultiResponseLocalGetWorkerInfoResponse, MultiResponseLocalListWorkersResponse,
  MultiResponseLocalCreateMetadataSnapshotResponse } from '../generated/';

@Injectable({ providedIn: 'root' })
export class NodeService {
  private nodeApi = inject(NodeApiService);
  private workerApi = inject(WorkerApiService);

  getNodeInfo(): Observable<MultiResponseLocalGetNodeInfoResponse> {
    return this.nodeApi.getNodeInfo({ node: '*' });
  }

  getNodeStatistics(): Observable<MultiResponseLocalGetNodeStatisticsResponse> {
    return this.nodeApi.getNodeStatistics({ node: '*' });
  }

  getNodeInfoById(nodeId: string): Observable<MultiResponseLocalGetNodeInfoResponse> {
    return this.nodeApi.getNodeInfo({ node: nodeId });
  }

  getNodeStatisticsById(nodeId: string): Observable<MultiResponseLocalGetNodeStatisticsResponse> {
    return this.nodeApi.getNodeStatistics({ node: nodeId });
  }

  createMetadataSnapshot(nodeId = '*'): Observable<MultiResponseLocalCreateMetadataSnapshotResponse> {
    return this.nodeApi.createMetadataSnapshot({ node: nodeId });
  }

  listWorkers(nodeId = '*', busyOnly?: boolean, errorOnly?: boolean): Observable<MultiResponseLocalListWorkersResponse> {
    return this.workerApi.listWorkers({
      node: nodeId,
      body: { busyOnly, errorOnly }
    });
  }

  getWorkerInfo(nodeId: string, workerId: number): Observable<MultiResponseLocalGetWorkerInfoResponse> {
    return this.workerApi.getWorkerInfo({
      node: nodeId,
      body: { id: workerId }
    });
  }
}
