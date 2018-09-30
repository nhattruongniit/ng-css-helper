import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RGB } from '../basic-form/basic-form.component';

export interface ShadowProps {
  shadowX: number;
  shadowY: number;
  shadowColor: RGB;
  shadowOpacity: number;
  shadowSpread: number;
  shadowBlur: number;
  shadowInset: boolean;
}

@Component({
  selector: 'app-shadow-form',
  templateUrl: './shadow-form.component.html',
  styleUrls: ['./shadow-form.component.scss']
})
export class ShadowFormComponent implements OnInit {
  @Output()
  shadowPropsChanged: EventEmitter<ShadowProps> = new EventEmitter<ShadowProps>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      shadowX: [0],
      shadowY: [0],
      shadowColor: [{ r: 0, g: 0, b: 0 }],
      shadowOpacity: [100],
      shadowSpread: [0],
      shadowBlur: [0],
      shadowInset: [false]
    });

    this.form.valueChanges.subscribe(value => {
      this.shadowPropsChanged.emit(value);
    });
  }

  getDecimalValue(value: number) {
    return (value / 100).toFixed(2);
  }
}
