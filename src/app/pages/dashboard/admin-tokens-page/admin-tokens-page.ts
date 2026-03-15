import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenCardComponent } from '../../../components/token-card-component/token-card-component';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { GarageDataService } from '../../../services/garage-data.service';

@Component({
  selector: 'app-admin-tokens-page',
  imports: [CommonModule, TokenCardComponent, RefreshButtonComponent],
  templateUrl: './admin-tokens-page.html',
  styleUrl: './admin-tokens-page.css',
})
export class AdminTokensPage implements OnInit {
  private garageDataService = inject(GarageDataService);

  adminTokens$ = this.garageDataService.adminTokens$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshAdminTokens().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
