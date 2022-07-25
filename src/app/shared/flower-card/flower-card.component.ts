import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
