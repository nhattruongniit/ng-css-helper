import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';

export enum PaddingOptions {
  Individual = 'Individual',
  Dimensional = 'Dimensional',
  All = 'All'
}

export interface PaddingProps {
  paddingOptions: PaddingOptions;
  paddingTop: number;
  paddingBottom: number;
  paddingRight: number;
  paddingLeft: number;
}

@Component({
  selector: 'app-padding-form',
  templateUrl: './padding-form.component.html',
  styleUrls: ['./padding-form.component.scss']
})
export class PaddingFormComponent implements OnInit {
  @Output()
  paddingPropsChanged: EventEmitter<PaddingProps> = new EventEmitter<PaddingProps>();

  form: FormGroup;
  paddingDropdownOptions: SelectItem[] = [
    { label: PaddingOptions.Individual, value: PaddingOptions.Individual },
    { label: PaddingOptions.Dimensional, value: PaddingOptions.Dimensional },
    { label: PaddingOptions.All, value: PaddingOptions.All }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      paddingOptions: [PaddingOptions.Individual],
      paddingTop: [0],
      paddingBottom: [0],
      paddingRight: [0],
      paddingLeft: [0]
    });

    this.form.valueChanges.subscribe((value: PaddingProps) => {
      this.paddingPropsChanged.emit(value);
    });
  }

  get paddingStyle(): PaddingOptions {
    return this.form.controls['paddingOptions'].value;
  }

  get paddingTopLabel(): string {
    switch (this.paddingStyle) {
      case PaddingOptions.All: {
        return 'Padding: ';
      }
      case PaddingOptions.Dimensional: {
        return 'Padding Top & Bottom: ';
      }
      default: {
        return 'Padding Top: ';
      }
    }
  }

  get paddingRightLabel(): string {
    switch (this.paddingStyle) {
      case PaddingOptions.Dimensional: {
        return 'Padding Right & Left: ';
      }
      default: {
        return 'Padding Right: ';
      }
    }
  }

  get shouldPaddingBottomOrLeftDisabled(): boolean {
    return this.paddingStyle === PaddingOptions.All || this.paddingStyle === PaddingOptions.Dimensional;
  }

  get shouldPaddingRightDisabled(): boolean {
    return this.paddingStyle === PaddingOptions.All;
  }
}
