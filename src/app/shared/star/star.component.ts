import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarComponent {
  @Input() favorite: boolean | undefined;
  @Output() markAsFavoriteEmitter = new EventEmitter<boolean>();

  constructor() { }

  public markAsFavorite(){
    this.markAsFavoriteEmitter.emit(true);
  }
}
