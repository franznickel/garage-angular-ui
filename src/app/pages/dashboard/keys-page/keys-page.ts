import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KeyService } from '../../../services/key.service';

@Component({
  selector: 'app-keys-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './keys-page.html',
  styleUrl: './keys-page.css',
})
export class KeysPage implements OnInit {
  private keyService = inject(KeyService);

  keys$ = this.keyService.keys$;
  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.keyService.refresh().subscribe({
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false,
    });
  }

  refresh(): void {
    this.load();
  }
}
