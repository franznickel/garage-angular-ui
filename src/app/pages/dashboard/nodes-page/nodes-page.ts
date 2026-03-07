import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { NodeService } from '../../../services/node.service';
import { MultiResponseLocalGetNodeInfoResponse, MultiResponseLocalGetNodeStatisticsResponse } from '../../../generated';

@Component({
  selector: 'app-nodes-page',
  imports: [CommonModule],
  templateUrl: './nodes-page.html',
  styleUrl: './nodes-page.css',
})
export class NodesPage implements OnInit {
  private nodeService = inject(NodeService);
  private cdr = inject(ChangeDetectorRef);

  nodeInfo: MultiResponseLocalGetNodeInfoResponse | null = null;
  nodeStatistics: MultiResponseLocalGetNodeStatisticsResponse | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    forkJoin({
      info: this.nodeService.getNodeInfo(),
      statistics: this.nodeService.getNodeStatistics(),
    }).subscribe({
      next: ({ info, statistics }) => {
        this.nodeInfo = info;
        this.nodeStatistics = statistics;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  refresh(): void {
    this.load();
  }
}
