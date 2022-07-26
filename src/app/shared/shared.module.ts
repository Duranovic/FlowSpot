import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerCardComponent } from './flower-card/flower-card.component';
import { FlowerListComponent } from './flower-list/flower-list.component';
import { StarComponent } from './star/star.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FlowerCardComponent,
    FlowerListComponent,
    StarComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FlowerCardComponent,
    FlowerListComponent,
    InputComponent,
  ]
})
export class SharedModule { }
