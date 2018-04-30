import { NgModule, ModuleWithProviders } from '@angular/core';
import { ScriptService } from './script.service';
import { CommonModule } from '@angular/common';
import { ScriptComponent } from './script.component';

@NgModule({
  declarations: [
    ScriptComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScriptComponent
  ]
})
export class ScriptLoaderModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScriptLoaderModule,
      providers: [
        ScriptService
      ]
    };
  }
}
