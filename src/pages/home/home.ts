import { Component,Inject,AfterViewInit ,ViewChild,Renderer,ElementRef} from '@angular/core';

import { Platform, ActionSheetController,NavController, ViewController,App } from 'ionic-angular';
import { AuthService } from './auth.service';
import { HelloPage } from '../hello-ionic/hello-ionic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AuthService]
})
export class HomePage  implements AfterViewInit{

  startTime:number;
  index:number=1;
  perform:boolean=true;
  pushPage:any;
  params:any;
  @ViewChild('wrapper') div: ElementRef;
  constructor(
    public appCtrl: App,
    public viewCtrl: ViewController,
    private service: AuthService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public navCtrl: NavController) {
    this.pushPage = HelloPage;
    this.params = { abc: 'lalaa' };
  }

  go(){
    this.navCtrl.push(HelloPage,{
      id: "123",
      name: "hello"
    });
    //this.viewCtrl.dismiss();
    //this.appCtrl.getRootNav().push(helloPage);
  }

  onSubmit(formValue) {
    console.log('auth result is: '
      + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }
  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password));
  }

  ngAfterViewInit() {
    // 隐式转换会报错 let a = '4'-3;
    var self = this;
    let outer = this.div.nativeElement;
    let outercChildren =outer.getElementsByTagName('div');
    let wh = (window.innerWidth-80)*3+80+50;
    let whCildren =window.innerWidth-80;
    let trans = getVendorPropertyName(outer,'transform');
    let duration = getVendorPropertyName(outer,'transition');
    let startX,moveX,endX;

    outer.style.width = `${wh}px`;
    for(let i=0;i<3;i++){
      outercChildren[i].style.width=`${whCildren}px`;
    }
    let smallW= (window.innerWidth-whCildren-50)/2;
    let bourn;
    var startHandler = function(e){
      outer.style[duration] ='0ms';
      let bournStr;
      if(!outer.style[trans]){
        bournStr='0px';
      } else {
        bournStr = outer.style[trans];
        bournStr=bournStr.replace(/translate3d\(/g,'').split(',')[0];
      }
      outer.style[trans] = `translate3d(${bournStr}, 0px, 0px)`;
      outer.style.backgroundColor='yellow';
      let startTime = new Date().getTime();
      let touches= e.changedTouches[0]||e.touches[0];
      let idx = 0;
      startX =touches.clientX||0;
      self.startTime=startTime;
      console.log(e);
      console.log(bournStr+'||')
      console.log('start'+startX);
    };
    var moveHandler = function(e) {
      e.preventDefault();
      let moveTime = new Date().getTime();
      let touches= e.changedTouches[0]||e.touches[0];
      let bournStr = outer.style[trans];
      moveX =touches.clientX;
      moveX = Math.floor(Math.floor(moveX-startX)/15);
      bournStr=bournStr.replace(/translate3d\(/g,'').split(',')[0];
      bournStr = Number(parseInt(bournStr));
      let distance = (bournStr+moveX);
      outer.style.backgroundColor='green';
      outer.style[trans] = `translate3d(${distance}px, 0px, 0px)`;

      let str = (typeof distance);
      console.log('move'+Math.floor(moveX)+'||'+distance+'|'+str+bournStr);
    };
    var endHandler = function(e){
      e.preventDefault();
      outer.style[duration] ='200ms';
      let touches= e.changedTouches[0]||e.touches[0];
      let endX =touches.pageX;
      let idx = self.index;
      let distance = Math.floor(endX-startX);
      if(distance>28){//向右滑动；
        console.log('num>20');
        if(idx<=3&&idx!=1){
          idx--;
        } else if(idx===1){
          idx=1;
        }
      }
      if(distance<-28){//向左滑动；
        console.log('num<-20');
        if(idx>=1&&idx!=3){
          idx++;
        } else if(idx===3) {
          idx=3;
        }
      }
      self.index = idx;
      if(idx===1){
        outer.style[trans] = `translate3d(0px, 0px, 0px)`;
      } else if(idx===2){
        bourn = whCildren-smallW+40;
        outer.style[trans] = `translate3d(-${bourn}px, 0px, 0px)`;
      } else {
        bourn = (whCildren-smallW)+whCildren+25+40;
        outer.style[trans] = `translate3d(-${bourn}px, 0px, 0px)`;
      }
      console.log('end'+bourn);
    }
    //绑定事件
    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);

    function getVendorPropertyName(div,prop) {
      // 是否支持标准
      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);
      //增加前缀
      for (var i = 0; i < prefixes.length; ++i) {
        var vendorProp = prefixes[i] + prop_;
        if (vendorProp in div.style) {
          return vendorProp;
        }
      }
    }
  }
}
