/* eslint-disable @angular-eslint/no-output-native */
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ScriptService } from './script.service';

@Component({
  selector: 'ngx-script',
  template: '',
  styleUrls: []
})
export class ScriptComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  attributes: {[key: string]: string} = {};

  @Output() load = new EventEmitter<Event>();

  @Output() error = new EventEmitter<Event>();

  constructor(private scriptService: ScriptService, private element: ElementRef) {}

  ngOnInit() {
    this.scriptService.loadScript(this.src, this.attributes, this.element.nativeElement)
      .subscribe((event) => {
        this.load.emit(event);
      }, (error) => {
        this.error.emit(error);
      });
  }
}
