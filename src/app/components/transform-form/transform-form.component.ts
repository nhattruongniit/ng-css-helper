import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TransformProps {
  perspective: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  skewX: number;
  skewY: number;
}

@Component({
  selector: 'app-transform-form',
  templateUrl: './transform-form.component.html',
  styleUrls: ['./transform-form.component.scss']
})
export class TransformFormComponent implements OnInit {
  @Output()
  transformPropsChanged: EventEmitter<TransformProps> = new EventEmitter<TransformProps>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      perspective: [0],
      rotateX: [0],
      rotateY: [0],
      rotateZ: [0],
      scaleX: [100],
      scaleY: [100],
      scaleZ: [100],
      skewX: [0],
      skewY: [0],
      translateX: [0],
      translateY: [0],
      translateZ: [0]
    });

    this.form.valueChanges.subscribe((value: TransformProps) => {
      this.transformPropsChanged.emit(value);
    });
  }

  getDecimalValue(value: number) {
    return (value / 100).toFixed(2);
  }
}
