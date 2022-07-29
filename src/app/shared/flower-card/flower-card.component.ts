import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flower } from 'src/app/core/models/flower.model';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerCardComponent {
  @Input() flower: Flower;
  constructor() { }
}
