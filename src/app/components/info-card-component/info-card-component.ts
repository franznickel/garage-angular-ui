import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-info-card-component',
  imports: [
    DatePipe
  ],
  templateUrl: './info-card-component.html',
  styleUrl: './info-card-component.css',
})
export class InfoCardComponent {
  @Input() value!: any;
  @Input() key!: string;
}
