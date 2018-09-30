import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';

export enum MarginOptions {
  Individual = 'Individual',
  Dimensional = 'Dimensional',
  All = 'All'
}

export interface MarginProps {
  marginOptions: MarginOptions;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
}

@Component({
  selector: 'app-margin-form',
  templateUrl: './margin-form.component.html',
  styleUrls: ['./margin-form.component.scss']
})
export class MarginFormComponent implements OnInit {
  @Output()
  marginPropsChanged: EventEmitter<MarginProps> = new EventEmitter<MarginProps>();

  form: FormGroup;
  marginDropdownOptions: SelectItem[] = [
    { label: MarginOptions.Individual, value: MarginOptions.Individual },
    { label: MarginOptions.Dimensional, value: MarginOptions.Dimensional },
    { label: MarginOptions.All, value: MarginOptions.All }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      marginOptions: [MarginOptions.Individual],
      marginTop: [0],
      marginBottom: [0],
      marginRight: [0],
      marginLeft: [0]
    });

    this.form.valueChanges.subscribe((value: MarginProps) => {
      this.marginPropsChanged.emit(value);
    });
  }

  get marginStyle(): MarginOptions {
    return this.form.controls['marginOptions'].value;
  }

  get marginTopLabel(): string {
    switch (this.marginStyle) {
      case MarginOptions.All: {
        return 'Margin: ';
      }
      case MarginOptions.Dimensional: {
        return 'Margin Top & Bottom: ';
      }
      default: {
        return 'Margin Top: ';
      }
    }
  }

  get marginRightLabel(): string {
    switch (this.marginStyle) {
      case MarginOptions.Dimensional: {
        return 'Margin Right & Left: ';
      }
      default: {
        return 'Margin Right: ';
      }
    }
  }

  get shouldMarginBottomOrLeftDisabled(): boolean {
    return this.marginStyle === MarginOptions.All || this.marginStyle === MarginOptions.Dimensional;
  }

  get shouldMarginRightDisabled(): boolean {
    return this.marginStyle === MarginOptions.All;
  }
}
