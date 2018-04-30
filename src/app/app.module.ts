import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ScriptLoaderModule } from './script-loader/script-loader.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScriptLoaderModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
