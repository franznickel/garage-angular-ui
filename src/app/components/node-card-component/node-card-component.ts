import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-node-card-component',
  imports: [
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './node-card-component.html',
  styleUrl: './node-card-component.css',
})
export class NodeCardComponent {
  @Input() node!: any;
}
