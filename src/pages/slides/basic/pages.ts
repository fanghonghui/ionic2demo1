import { Component,ViewChild,OnInit} from '@angular/core';
import { Slides,Segment} from 'ionic-angular';
@Component({
  selector: 'slides-page',
  templateUrl: 'template.html',
  styles: [
   `
 .tabs {
  width: 100%;
  height:auto;
  display: flex;
}
.tabs span:nth-child(2){
  border-left:1px solid #2290ff;
  border-right:1px solid #2290ff;
}
.tabs span {
  width: 33%;
  display: block;
  text-align: center;
  background: #ccc;
  line-height: 40px;
}
.tabs span.active{
  border-bottom: 3px solid #2290ff;
}
.swiper-container .swiper-wrapper{
    height:auto;
  }
   `
]
})
export class BasicPage implements OnInit{
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Segment) segment: Segment;
  currentIndex=0;
   constructor(){
   }
  goToSlide(idx) {
    this.slides.slideTo(idx, 500);
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log(this.currentIndex)
    if(this.currentIndex===4){
      this.currentIndex=3;
    }
    for(let i=0;i<4;i++){
      this.segment._elementRef.nativeElement.children[i].classList.remove('mystyle','segment-activated');
    }
    this.segment._elementRef.nativeElement.children[this.currentIndex].classList.add('mystyle','segment-activated');
      console.log("Current index is");
  }
  selectedFriends(idx){
    this.slides.slideTo(idx, 500);
  }
  ngOnInit(){
    this.segment._elementRef.nativeElement.children[0].classList.add('mystyle','segment-activated');
  }

}
