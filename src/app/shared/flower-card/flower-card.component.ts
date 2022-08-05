// Angular and 3rd party
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Services
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';

// Models
import { Flower } from 'src/app/core/models/flower.model';


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
