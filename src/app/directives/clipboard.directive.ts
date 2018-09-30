import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ClipboardService } from '../services/clipboard.service';

@Directive({
  selector: '[appClipboard]',
})
export class ClipboardDirective {

  @Input() valueToCopy = '';
  @Output() valueCopied: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private clipboardService: ClipboardService) {
  }

  @HostListener('onClick')
  copyToClipboard() {
    this.clipboardService.copy(this.valueToCopy)
      .then(() => {
        this.valueCopied.emit(true);
      })
      .catch(() => {
        this.valueCopied.emit(false);
      });
  }

}
