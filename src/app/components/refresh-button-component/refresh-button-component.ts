import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-refresh-button-component',
  imports: [],
  templateUrl: './refresh-button-component.html',
  styleUrl: './refresh-button-component.css',
})
export class RefreshButtonComponent {
  @Output()
  buttonClicked = new EventEmitter<void>();
  @Input() isLoading!: boolean;

  onClick() {
    this.buttonClicked.emit();
  }
}
