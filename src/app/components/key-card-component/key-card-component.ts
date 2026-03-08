import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-key-card-component',
  imports: [RouterLink],
  templateUrl: './key-card-component.html',
  styleUrl: './key-card-component.css',
})
export class KeyCardComponent {
  @Input() key!: any;
}
