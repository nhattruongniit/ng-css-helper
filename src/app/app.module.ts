import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PrimengImportModule } from './primeng-import.module';
import { BoxComponent } from './components/box/box.component';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { GradientFormComponent } from './components/gradient-form/gradient-form.component';
import { PaddingFormComponent } from './components/padding-form/padding-form.component';
import { MarginFormComponent } from './components/margin-form/margin-form.component';
import { TransformFormComponent } from './components/transform-form/transform-form.component';
import { BorderFormComponent } from './components/border-form/border-form.component';
import { ShadowFormComponent } from './components/shadow-form/shadow-form.component';
import { ClipboardDirective } from './directives/clipboard.directive';

library.add(fas, fab);

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    BasicFormComponent,
    GradientFormComponent,
    PaddingFormComponent,
    MarginFormComponent,
    TransformFormComponent,
    BorderFormComponent,
    ShadowFormComponent,
    ClipboardDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PrimengImportModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
