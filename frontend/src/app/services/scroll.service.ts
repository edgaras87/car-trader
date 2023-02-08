import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToHTMLElement(htmlElement?: HTMLElement|null):void {
    if (htmlElement){
      window.scroll({
        top: this.getTopOffset(htmlElement),
        left: 0,
        behavior: "smooth"
      });
    }
  }

  scrollToTheTop():void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset:number = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }



}
