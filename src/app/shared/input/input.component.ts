import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputType } from 'src/app/core/enums/input-type.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() type: InputType;
  @Input() label: string;
  @Input() control: FormControl;

  public inputType = InputType;
  
  constructor() { }
}
