import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTokenService } from '../../../services/admin-token.service';

@Component({
  selector: 'app-admin-tokens-page',
  imports: [CommonModule],
  templateUrl: './admin-tokens-page.html',
  styleUrl: './admin-tokens-page.css',
})
export class AdminTokensPage implements OnInit {
  private adminTokenService = inject(AdminTokenService);

  adminTokens$ = this.adminTokenService.adminTokens$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.adminTokenService.refresh().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
