import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface BasicProps {
  width: number;
  height: number;
  background: RGB;
  backgroundOpacity: number;
  text: RGB;
  textOpacity: number;
}

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  @Output()
  basicPropsChanged: EventEmitter<BasicProps> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      width: [100],
      height: [100],
      background: [{ r: 0, g: 0, b: 0 }],
      backgroundOpacity: [100],
      text: [{ r: 255, g: 255, b: 255 }],
      textOpacity: [100]
    });

    this.form.valueChanges.subscribe((basicProps: BasicProps) => {
      this.basicPropsChanged.emit(basicProps);
    });
  }

  getDecimalValue(value: number) {
    return (value / 100).toFixed(2);
  }
}
