import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
