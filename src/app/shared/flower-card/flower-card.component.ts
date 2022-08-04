import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flower } from 'src/app/core/models/flower.model';
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerCardComponent {
  @Input() flower: Flower;
  @Input() showStar: boolean;

  constructor(private flowersFacade: FlowersFacade) { }

  public markAsFavorite($event: any): void {
    (this.flower.favorite && this.flower.favorite_id) ? this.flowersFacade.deleteFavoriteFlower(this.flower.id, this.flower.favorite_id) : this.flowersFacade.setFavoriteFlower(this.flower.id);
  }
}
