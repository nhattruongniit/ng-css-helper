import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule  } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

const modules = [
  ButtonModule,
  SliderModule,
  InputTextModule,
  ScrollPanelModule,
  AccordionModule,
  ColorPickerModule,
  DropdownModule,
  CheckboxModule,
  DialogModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimengImportModule {
}
