import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gradient-form',
  templateUrl: './gradient-form.component.html',
  styleUrls: ['./gradient-form.component.scss']
})
export class GradientFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({});
  }
}
