// Angular and 3rd party modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter"

// Components
import { FlowerCardComponent } from './flower-card/flower-card.component';
import { FlowerListComponent } from './flower-list/flower-list.component';
import { StarComponent } from './star/star.component';
import { InputComponent } from './input/input.component';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  exports: [
    FlowerCardComponent,
    FlowerListComponent,
    InputComponent,
  ]
})
export class SharedModule { }
