import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { take, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(@Inject(DOCUMENT) private _document: any) {}

  private scriptsLoaders: {
    [url: string]: Observable<Event>
  } = {};

  /**
   *
   * @param url Url of the external script to be loaded
   * @param attributes Attribute list to be added to the script element
   * @param targetEl Target element for the placing script tag. It can be a selector or a element reference
   */
  loadScript(url: string, attributes?: {[s: string]: string}, targetEl: HTMLElement | string = 'head' ): Observable<Event> {
    return this.scriptsLoaders[url] = this.scriptsLoaders[url] || new Observable<Event>((observer) => {
      const script: HTMLScriptElement = this._document.createElement('script');

      if (attributes) {
        for (const key in attributes) {
          if (attributes.hasOwnProperty(key)) {
            script.setAttribute(key, attributes[key]);
          }
        }
      }

      script.onload = (event: Event) => {
        observer.next(event);
        observer.complete();
      };

      script.onerror = err => {
        observer.error(err);
      };

      script.src = url;

      const targetElement: HTMLElement = typeof targetEl === 'string' ? this._document.querySelector(targetEl) : targetEl;
      targetElement.appendChild(script);
    })
    .pipe(
      take(1),
      shareReplay(1)
    );
  }
}
