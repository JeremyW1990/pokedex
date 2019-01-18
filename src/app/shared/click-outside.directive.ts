import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      console.log(clickedInside);
      if (!clickedInside) {
          this.clickOutside.emit(null);
      }
  }
}
