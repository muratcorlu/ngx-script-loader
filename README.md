# ngx-script-loader - Angular Script Loader

[![NPM Package](https://badge.fury.io/js/ngx-script-loader.svg)](https://npmjs.org/package/ngx-script-loader) [![Build Status](https://travis-ci.org/muratcorlu/ngx-script-loader.svg?branch=master)](https://travis-ci.org/muratcorlu/ngx-script-loader) [![codecov](https://codecov.io/gh/muratcorlu/ngx-script-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/muratcorlu/ngx-script-loader) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

`ngx-script-loader` presents a simple `ScriptService` for [Angular](https://angular.io) apps to load 3rd party scripts programmatically.

## Installation

With npm:
```
npm i --save ngx-script-loader
```

With yarn:
```
yarn add ngx-script-loader
```

Note: v2 tested with Angular 11. You can use v1.x if you want to use with older versions of Angular (supports from Angular v6).
## Usage

Import `ScriptLoaderModule` to your app.

```ts
import { ScriptLoaderModule } from 'ngx-script-loader';

@NgModule{
  ....
  imports: [
    ...,
    ScriptLoaderModule
  ],
```

## Using Service

You can use `ScriptService` to load external script inside your components or services.

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponent {
  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places').subscribe(() => {
      // Do something with Google Places API
    });
  }
}
```

Even if you call `loadScript` multiple time at the same time for same url, it will inject that url once and resolve all subscribers.

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponent {
  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places').subscribe(() => {
      console.log("I'm ready to work with google library");
    });
    this.scriptService.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places').subscribe(() => {
      console.log("I'm ready to work with google library");
    });
    this.scriptService.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places').subscribe(() => {
      console.log("I'm ready to work with google library");
    });
    this.scriptService.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places').subscribe(() => {
      console.log("I'm ready to work with google library");
    });
  }
}
```

With the example above you will see `I'm ready to work with google library` log 4 times but you will see only 1 script tag for requested script in the document.

### Handling failures

When script loading has failed, `onError` callback of observable will be triggered.

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponent {
  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('https://connect.facebook.net/en_US/sdk.js').subscribe(() => {
      console.log("I'm ready to work with FB SDK");
    }, (error) => {
      console.log('Something wrong', error);
    });
  }
}
```

It's also possible to use `retry` method of RxJS to retry injection script when it's failed.

```ts
import { ScriptService } from 'ngx-script-loader';
import { retry } from 'rxjs/operators';

@Component({
  ...
})
export class ExampleComponent {
  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('https://connect.facebook.net/en_US/sdk.js')
      .pipe(
        retry(1)
      )
      .subscribe(() => {
        console.log("I'm ready to work with FB SDK");
      }, (error) => {
        console.log('I tried 2 times but no luck');
      });
  }
}
```

### Adding custom attributes

Some 3rd party libraries need to read some attributes from their script tag itself. It's also possible to add custom attributes to script tag with `ScriptService`:

```ts
this.scriptService.loadScript('https://menus.singleplatform.com/widget', {
  'id': 'singleplatform-menu',
  'data-location': 'spiros-restaurant--lounge',
  'data-api_key': 'ke09z8icq4xu8uiiccighy1bw'
}).subscribe();
```

### Setting target element

By default, `ScriptService` adds new script tag to the `head` of HTML. But you can also define target place as 3rd parameter of `loadScript` method. It can be a selector string or `HTMLElement` object.

```ts
this.scriptService.loadScript('https://menus.singleplatform.com/widget', {
  'id': 'singleplatform-menu',
  'data-location': 'spiros-restaurant--lounge',
  'data-api_key': 'ke09z8icq4xu8uiiccighy1bw'
}, '#menu-container').subscribe();
```

or

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponent implements OnInit {
  @ViewChild() menuContainer: ElementRef;

  constructor(private scriptService: ScriptService) {}

  ngOnInit() {
    this.scriptService.loadScript('https://menus.singleplatform.com/widget', {
      'id': 'singleplatform-menu',
      'data-location': 'spiros-restaurant--lounge',
      'data-api_key': 'ke09z8icq4xu8uiiccighy1bw'
    }, this.menuContainer.nativeElement).subscribe();
  }
```

## Using Component

`ngx-script-loader` also presents `ngx-script` component.

```html
<ngx-script src="https://maps.googleapis.com/maps/api/js?libraries=places"
  (load)="onReady()"
  (error)="onError()"
  ></ngx-script>
```

When you use `ngx-script`, target place for script tag is inside of `ngx-script` element. So, for 3rd part widgets that uses `document.write`, this component is the easiest and cleanist way of using them.

You can also set attributes for script tag with `attributes` input parameter:

```html
<ngx-script src="https://maps.googleapis.com/maps/api/js?libraries=places"
  [attributes]="spMenuAttributes"
  (load)="onReady()"
  (error)="onError()"
  ></ngx-script>
```

```ts
class ExampleComponent {
  spMenuAttributes = {
    'id': 'singleplatform-menu',
    'data-location': 'spiros-restaurant--lounge',
    'data-api_key': 'ke09z8icq4xu8uiiccighy1bw'
  }
}
```

## Running a script multiple times

By default `loadScript()` method loads a script only once in a session. If you want to inject same script multiple times, you can use `runScript()` method instead.

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponent {
  constructor(private scriptService: ScriptService) {
    this.scriptService.runScript('https://example.com/random-news.js', {}, '#news-area').subscribe();
    this.scriptService.runScript('https://example.com/random-news.js', {}, '#news-area').subscribe();
    this.scriptService.runScript('https://example.com/random-news.js', {}, '#news-area').subscribe();
  }
}
```

All of the parameters of `runScript()` are same with `loadScript()`.
