import { TestBed, inject } from '@angular/core/testing';
import { ScriptService } from './script.service';
import { DOCUMENT } from '@angular/platform-browser';

describe('ScriptService', () => {
  let service: ScriptService;
  let document: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptService]
    });

    service = TestBed.get(ScriptService);
    document = TestBed.get(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject the script', () => {
    const scriptUrl = 'http://example.com';
    service.loadScript(scriptUrl).subscribe();

    expect(document.querySelector('head script').getAttribute('src')).toBe(scriptUrl);
  });


  it('should inject the script to correct target', () => {
    const scriptUrl = 'http://example.com';
    service.loadScript(scriptUrl, {}, 'body').subscribe();

    expect(document.querySelector('body script[src$="example.com"]')).not.toBeNull();
  });
});
