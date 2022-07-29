import { Component, OnInit } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { Flower } from 'src/app/core/models/flower.model';
import { FlowersService } from 'src/app/core/services/flowers/flowers.service';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loaded$: Observable<boolean>;
  flowers$: Observable<Flower[]>;

  constructor(private flowersService: FlowersService) {}

  ngOnInit(): void {
    this.loaded$ = this.flowersService.loaded$.pipe(
      tap((loaded) => {
        loaded
          ? (this.flowers$ = this.flowersService.entities$)
          : (this.flowers$ = this.flowersService.getAll());
      })
    );
  }
}
