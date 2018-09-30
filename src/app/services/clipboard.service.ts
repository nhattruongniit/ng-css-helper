import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  private _dom: Document;

  constructor(@Inject(DOCUMENT) dom: Document) {
    this._dom = dom;
  }

  copy(value: string): Promise<string> {
    return new Promise<string>(resolve => {
      let textarea = null;

      try {
        textarea = this._dom.createElement('textarea');
        textarea.style.height = '0px';
        textarea.style.left = '-100px';
        textarea.style.opacity = '0';
        textarea.style.position = 'fixed';
        textarea.style.top = '-100px';
        textarea.style.width = '0px';

        this._dom.body.appendChild(textarea);

        textarea.value = `.box ${value}`;
        textarea.select();

        this._dom.execCommand('copy');

        resolve(value);
      } finally {
        // Cleanup - remove the Textarea from the DOM if it was injected.
        if (textarea && textarea.parentNode) {
          textarea.parentNode.removeChild(textarea);
        }
      }
    });
  }
}
