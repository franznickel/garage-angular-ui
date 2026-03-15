import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { InfoCardComponent } from '../../../../components/info-card-component/info-card-component';
import { RefreshButtonComponent } from '../../../../components/refresh-button-component/refresh-button-component';
import { GarageDataService } from '../../../../services/garage-data.service';

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
  private garageDataService = inject(GarageDataService);
  private cdr = inject(ChangeDetectorRef);

  node$ = this.garageDataService.clusterStatus$.pipe(
    map(status => status?.nodes?.find(n => n.id === this.nodeId))
  );
  nodeInfo$ = this.garageDataService.getNodeInfo$(this.route.snapshot.params['id']);
  isLoading = false;
  nodeId = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    forkJoin({
      nodeInfo: this.garageDataService.getNodeInfo(this.route.snapshot.params['id']),
      status: this.garageDataService.refreshClusterStatus(),
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
