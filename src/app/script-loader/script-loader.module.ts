import { NgModule } from '@angular/core';
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
  providers: [
    ScriptService
  ],
  exports: [
    ScriptComponent
  ]
})
export class ScriptLoaderModule { }
