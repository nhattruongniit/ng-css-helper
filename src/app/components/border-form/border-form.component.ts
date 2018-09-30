import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RGB } from '../basic-form/basic-form.component';

export interface BorderProps {
  borderColor: RGB;
  borderWidth: number;
  borderRadius: number;
  borderOpacity: number;
}

@Component({
  selector: 'app-border-form',
  templateUrl: './border-form.component.html',
  styleUrls: ['./border-form.component.scss']
})
export class BorderFormComponent implements OnInit {
  @Output()
  borderPropsChanged: EventEmitter<BorderProps> = new EventEmitter<BorderProps>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      borderColor: [{ r: 0, g: 0, b: 0 }],
      borderWidth: [0],
      borderRadius: [0],
      borderOpacity: [100]
    });

    this.form.valueChanges.subscribe(value => {
      this.borderPropsChanged.emit(value);
    });
  }

  getDecimalValue(value: number) {
    return (value / 100).toFixed(2);
  }
}
