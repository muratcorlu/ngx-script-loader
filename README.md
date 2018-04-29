# ngx-script-loader - Angular Script Loader

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

## Usage

Import `ScriptService` to your module providers.

```ts
import { ScriptService } from 'ngx-script-loader';

@NgModule{
  ....
  providers: [
    ...,
    ScriptService
  ],
```

Now you can use `ScriptService` to load external script inside your components or services.

```ts
import { ScriptService } from 'ngx-script-loader';

@Component({
  ...
})
export class ExampleComponet {
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
export class ExampleComponet {
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
export class ExampleComponet {
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
import 'rxjs/add/operator/retry';

@Component({
  ...
})
export class ExampleComponet {
  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('https://connect.facebook.net/en_US/sdk.js')
      .retry(1)
      .subscribe(() => {
        console.log("I'm ready to work with FB SDK");
      }, (error) => {
        console.log('I tried 2 times but no luck');
      });
  }
}
```

## Features

- It checks if the url already loaded. So it doesn't load same url for multiple times.
