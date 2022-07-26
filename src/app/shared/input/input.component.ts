import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() type: string | undefined;
  @Input() label: string | undefined;
  @Input() value: string | undefined;
  @Input() controlName: string | undefined;
  @Input() fromControl: FormControl | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
