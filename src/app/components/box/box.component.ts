import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable, pipe } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { BasicProps } from '../basic-form/basic-form.component';
import { PaddingOptions, PaddingProps } from '../padding-form/padding-form.component';
import { MarginOptions, MarginProps } from '../margin-form/margin-form.component';
import { TransformProps } from '../transform-form/transform-form.component';
import { BorderProps } from '../border-form/border-form.component';
import { ShadowProps } from 'src/app/components/shadow-form/shadow-form.component';

export interface BasicStyle {
  width: string;
  height: string;
  color: string;
  background: string;
}

export interface PaddingStyle {
  padding: string;
}

export interface MarginStyle {
  margin: string;
}

export interface TransformStyle {
  transform: string;
}

export interface BorderStyle {
  border: string;
  'border-radius': string;
}

export interface ShadowStyle {
  'box-shadow': string;
}

export interface DefaultStyle {
  basic: BasicStyle;
  padding: PaddingStyle;
  margin: MarginStyle;
  transform: TransformStyle;
  border: BorderStyle;
  shadow: ShadowStyle;
}

export type BoxStyle = BasicStyle & PaddingStyle & MarginStyle & TransformStyle & BorderStyle & ShadowStyle;

const startsWithDistinct = pipe(
  distinctUntilChanged(),
  startWith(null)
);

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  private static readonly defaultStyle: DefaultStyle = {
    basic: {
      width: '100px',
      height: '100px',
      color: 'rgba(255, 255, 255, 1)',
      background: 'rgba(0, 0, 0, 1)'
    },
    padding: {
      padding: '0'
    },
    margin: {
      margin: '0'
    },
    transform: {
      transform: 'none'
    },
    border: {
      border: 'none',
      'border-radius': 'none'
    },
    shadow: {
      'box-shadow': 'none'
    }
  };

  @Output()
  boxStyleEmitter: EventEmitter<BoxStyle> = new EventEmitter<BoxStyle>();

  @Input()
  basicPropsObs: Observable<BasicProps>;
  @Input()
  paddingPropsObs: Observable<PaddingProps>;
  @Input()
  marginPropsObs: Observable<MarginProps>;
  @Input()
  transformPropsObs: Observable<TransformProps>;
  @Input()
  borderPropsObs: Observable<BorderProps>;
  @Input()
  shadowPropsObs: Observable<ShadowProps>;

  boxStyle: BoxStyle = {
    ...BoxComponent.defaultStyle.basic,
    ...BoxComponent.defaultStyle.padding,
    ...BoxComponent.defaultStyle.margin,
    ...BoxComponent.defaultStyle.transform,
    ...BoxComponent.defaultStyle.border,
    ...BoxComponent.defaultStyle.shadow
  };
  basicStyle: BasicStyle;
  paddingStyle: PaddingStyle;
  marginStyle: MarginStyle;
  transformStyle: TransformStyle;
  borderStyle: BorderStyle;
  shadowStyle: ShadowStyle;

  constructor() {}

  ngOnInit() {
    this.basicStyle = { ...BoxComponent.defaultStyle.basic };
    this.paddingStyle = { ...BoxComponent.defaultStyle.padding };
    this.marginStyle = { ...BoxComponent.defaultStyle.margin };
    this.transformStyle = { ...BoxComponent.defaultStyle.transform };
    this.borderStyle = { ...BoxComponent.defaultStyle.border };
    this.shadowStyle = { ...BoxComponent.defaultStyle.shadow };

    combineLatest([
      this.basicPropsObs.pipe(startsWithDistinct),
      this.paddingPropsObs.pipe(startsWithDistinct),
      this.marginPropsObs.pipe(startsWithDistinct),
      this.transformPropsObs.pipe(startsWithDistinct),
      this.borderPropsObs.pipe(startsWithDistinct),
      this.shadowPropsObs.pipe(startsWithDistinct)
    ]).subscribe(
      ([basicProps, paddingProps, marginProps, transformProps, borderProps, shadowProps]: [
        BasicProps,
        PaddingProps,
        MarginProps,
        TransformProps,
        BorderProps,
        ShadowProps
      ]) => {
        if (basicProps) {
          const { width, height, background, text, backgroundOpacity, textOpacity } = basicProps;
          this.basicStyle.width = this.toPixelString(width);
          this.basicStyle.height = this.toPixelString(height);
          this.basicStyle.background = this.toRGB(background.r, background.g, background.b, backgroundOpacity);
          this.basicStyle.color = this.toRGB(text.r, text.g, text.b, textOpacity);
        }

        if (paddingProps) {
          this.paddingStyle.padding = this.getPaddingFromProps(paddingProps);
        }

        if (marginProps) {
          this.marginStyle.margin = this.getMarginFromProps(marginProps);
        }

        if (transformProps) {
          this.transformStyle.transform = this.getTransformFromProps(transformProps);
        }

        if (borderProps) {
          const { borderColor, borderOpacity, borderRadius, borderWidth } = borderProps;
          this.borderStyle.border = `${borderWidth}px solid ${this.toRGB(
            borderColor.r,
            borderColor.g,
            borderColor.b,
            borderOpacity
          )}`;
          this.borderStyle['border-radius'] = `${borderRadius}%`;
        }

        if (shadowProps) {
          this.shadowStyle['box-shadow'] = this.getShadowFromProps(shadowProps);
        }

        this.boxStyle = {
          ...this.basicStyle,
          ...this.paddingStyle,
          ...this.marginStyle,
          ...this.transformStyle,
          ...this.borderStyle,
          ...this.shadowStyle
        };

        this.boxStyleEmitter.emit(this.boxStyle);
      }
    );
  }

  toPixelString(num: number): string {
    return `${num}px`;
  }

  toRGB(r: number, g: number, b: number, opacity: number): string {
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  }

  private getPaddingFromProps(paddingProps: PaddingProps): string {
    const { paddingOptions, paddingTop } = paddingProps;
    let { paddingBottom, paddingLeft, paddingRight } = paddingProps;

    if (paddingOptions === PaddingOptions.All) {
      paddingBottom = paddingLeft = paddingRight = paddingTop;
    } else if (paddingOptions === PaddingOptions.Dimensional) {
      paddingBottom = paddingTop;
      paddingLeft = paddingTop;
    }

    return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
  }

  private getMarginFromProps(marginProps: MarginProps): string {
    const { marginOptions, marginTop } = marginProps;
    let { marginBottom, marginLeft, marginRight } = marginProps;

    if (marginOptions === MarginOptions.All) {
      marginBottom = marginLeft = marginRight = marginTop;
    } else if (marginOptions === MarginOptions.Dimensional) {
      marginBottom = marginTop;
      marginLeft = marginTop;
    }

    return `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
  }

  private getTransformFromProps(transformProps: TransformProps) {
    const {
      perspective,
      rotateX,
      rotateY,
      rotateZ,
      scaleX,
      scaleY,
      scaleZ,
      translateX,
      translateY,
      translateZ,
      skewX,
      skewY
    } = transformProps;
    return `
      perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)
      scaleX(${scaleX / 100}) scaleY(${scaleY / 100}) scaleZ(${scaleZ / 100})
      translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)
      skewX(${skewX}deg) skewY(${skewY}deg)
    `;
  }

  private getShadowFromProps(shadowProps: ShadowProps) {
    const { shadowX, shadowY, shadowSpread, shadowBlur, shadowColor, shadowInset, shadowOpacity } = shadowProps;
    const shadowStyle = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${this.toRGB(
      shadowColor.r,
      shadowColor.g,
      shadowColor.b,
      shadowOpacity
    )}`;

    return shadowInset ? shadowStyle.concat(' inset') : shadowStyle;
  }
}
