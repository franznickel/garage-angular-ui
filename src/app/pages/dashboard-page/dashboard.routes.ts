import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard-page';
import { OverviewPage } from '../dashboard/overview-page/overview-page';
import { BucketsPage } from '../dashboard/buckets-page/buckets-page';
import { BucketDetailPage } from '../dashboard/buckets-page/bucket-detail-page/bucket-detail-page';
import { KeysPage } from '../dashboard/keys-page/keys-page';
import { KeyDetailPage } from '../dashboard/keys-page/key-detail-page/key-detail-page';
import { AdminTokensPage } from '../dashboard/admin-tokens-page/admin-tokens-page';
import { NodesPage } from '../dashboard/nodes-page/nodes-page';
import { NodeDetailPage } from '../dashboard/nodes-page/node-detail-page/node-detail-page';
import { ClusterLayoutPage } from '../dashboard/cluster-layout-page/cluster-layout-page';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewPage,
        title: 'Overview',
      },
      {
        path: 'layout',
        component: ClusterLayoutPage,
        title: 'Cluster Layout',
      },
      {
        path: 'buckets',
        component: BucketsPage,
        title: 'Buckets',
      },
      {
        path: 'buckets/:id',
        component: BucketDetailPage,
        title: 'Bucket Details',
      },
      {
        path: 'keys',
        component: KeysPage,
        title: 'Keys',
      },
      {
        path: 'keys/:id',
        component: KeyDetailPage,
        title: 'Key Details',
      },
      {
        path: 'token',
        component: AdminTokensPage,
        title: 'Admin Tokens',
      },
      {
        path: 'nodes',
        component: NodesPage,
        title: 'Nodes',
      },
      {
        path: 'nodes/:id',
        component: NodeDetailPage,
        title: 'Node Details',
      },
    ],
  },
];
