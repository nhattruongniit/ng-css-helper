import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BasicProps } from './components/basic-form/basic-form.component';
import { PaddingProps } from './components/padding-form/padding-form.component';
import { MarginProps } from './components/margin-form/margin-form.component';
import { TransformProps } from './components/transform-form/transform-form.component';
import { BorderProps } from './components/border-form/border-form.component';
import { ShadowProps } from 'src/app/components/shadow-form/shadow-form.component';
import { BoxStyle } from 'src/app/components/box/box.component';

export interface BackgroundStyle {
  'background-image': string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  backgroundStyle: BackgroundStyle;
  boxStyle: BoxStyle;
  showDialog = false;
  copyButtonLabel = 'Copy to clipboard';
  copyButtonDisabled = false;

  private basicPropsSub: Subject<BasicProps> = new Subject<BasicProps>();
  basicPropsObs = this.basicPropsSub.asObservable();

  private paddingPropsSub: Subject<PaddingProps> = new Subject<PaddingProps>();
  paddingPropsObs = this.paddingPropsSub.asObservable();

  private marginPropsSub: Subject<MarginProps> = new Subject<MarginProps>();
  marginPropsObs = this.marginPropsSub.asObservable();

  private transformPropsSub: Subject<TransformProps> = new Subject<TransformProps>();
  transformPropsObs = this.transformPropsSub.asObservable();

  private borderPropsSub: Subject<BorderProps> = new Subject<BorderProps>();
  borderPropsObs = this.borderPropsSub.asObservable();

  private shadowPropsSub: Subject<ShadowProps> = new Subject<ShadowProps>();
  shadowPropsObs = this.shadowPropsSub.asObservable();

  onBasicPropsChanged(basicProps: BasicProps) {
    this.basicPropsSub.next(basicProps);
  }

  onPaddingPropsChanged(paddingProps: PaddingProps) {
    this.paddingPropsSub.next(paddingProps);
  }

  onMarginPropsChanged(marginProps: MarginProps) {
    this.marginPropsSub.next(marginProps);
  }

  onTransformPropsChanged(transformProps: TransformProps) {
    this.transformPropsSub.next(transformProps);
  }

  onBorderPropsChanged(borderProps: BorderProps) {
    this.borderPropsSub.next(borderProps);
  }

  onShadowPropsChanged(shadowProps: ShadowProps) {
    this.shadowPropsSub.next(shadowProps);
  }

  onBoxStyleEmitted(boxStyle: BoxStyle) {
    this.boxStyle = boxStyle;
  }

  onValueCopied(copied: boolean) {
    this.copyButtonLabel = copied ? 'Copied!' : 'Try again...';
    this.copyButtonDisabled = true;

    setTimeout(() => {
      this.copyButtonLabel = 'Copy to clipboard!';
      this.copyButtonDisabled = false;
    }, 1000);
  }

  get valueToCopy(): string {
    return JSON.stringify(this.boxStyle);
  }
}
