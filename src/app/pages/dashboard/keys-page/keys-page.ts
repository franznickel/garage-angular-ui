import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyCardComponent } from '../../../components/key-card-component/key-card-component';
import { RefreshButtonComponent } from '../../../components/refresh-button-component/refresh-button-component';
import { GarageDataService } from '../../../services/garage-data.service';

@Component({
  selector: 'app-keys-page',
  imports: [CommonModule, KeyCardComponent, RefreshButtonComponent],
  templateUrl: './keys-page.html',
  styleUrl: './keys-page.css',
})
export class KeysPage implements OnInit {
  private garageDataService = inject(GarageDataService);

  keys$ = this.garageDataService.keys$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.garageDataService.refreshKeys().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
