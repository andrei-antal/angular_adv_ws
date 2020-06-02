import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[ngiMovieImageFallback]',
})
export class MovieImageFallbackDirective implements OnInit {
  @Input() ngiMovieImageFallback: string;

  @HostListener('error')
  setImage() {
    this.el.nativeElement.src = this.ngiMovieImageFallback;
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (!this.ngiMovieImageFallback) {
      this.ngiMovieImageFallback = 'assets/noImage1.jpg';
    }
  }
}
