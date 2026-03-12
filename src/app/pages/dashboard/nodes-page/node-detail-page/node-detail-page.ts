import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NodeService } from '../../../../services/node.service';
import {forkJoin, map} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import { InfoCardComponent } from '../../../../components/info-card-component/info-card-component';
import { RefreshButtonComponent } from '../../../../components/refresh-button-component/refresh-button-component';

@Component({
  selector: 'app-node-detail-page',
  imports: [
    AsyncPipe,
    InfoCardComponent,
    RefreshButtonComponent,
    DecimalPipe
  ],
  templateUrl: './node-detail-page.html',
  styleUrl: './node-detail-page.css',
})
export class NodeDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private nodeService = inject(NodeService);
  private cdr = inject(ChangeDetectorRef);

  node$ = this.nodeService.clusterStatus$.pipe(
    map(status => status?.nodes?.find(n => n.id === this.nodeId))
  );
  nodeInfo$ = this.nodeService.getNodeInfoById$(this.route.snapshot.params['id']);
  isLoading = false;
  nodeId = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    forkJoin({
      nodeInfo: this.nodeService.getNodeInfoById(this.route.snapshot.params['id']),
      status: this.nodeService.refresh(),
    }).subscribe({
      complete: () => {
        this.isLoading = false
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false
        this.cdr.detectChanges();
      },
    });
  }

  refresh(): void {
    this.load();
  }
}
