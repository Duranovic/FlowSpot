import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Flower } from 'src/app/core/models/flower.model';

@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerListComponent implements OnInit {
  @Input() flowers: Flower[];
  constructor() { }

  ngOnInit(): void {
  }

}
