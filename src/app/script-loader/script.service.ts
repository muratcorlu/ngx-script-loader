import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/shareReplay';

declare var document: any;

@Injectable()
export class ScriptService {

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
    if (url in this.scriptsLoaders) {
      return this.scriptsLoaders[url];
    }

    this.scriptsLoaders[url] = Observable.create((observer) => {
        const script: HTMLScriptElement = document.createElement('script');

        if (attributes) {
          for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
              script.setAttribute(key, attributes[key]);
            }
          }
        }

        script.src = url;

        script.onload = (event: Event) => {
          observer.next(event);
          observer.complete();
        };

        script.onerror = err => {
          observer.error(err);
        };

        const targetElement: HTMLElement = typeof targetEl === 'string' ? document.querySelector(targetEl) : targetEl;
        targetElement.appendChild(script);
      })
      .take(1)
      .shareReplay(1);

    return this.scriptsLoaders[url];
  }

}
