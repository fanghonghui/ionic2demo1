import { Component ,AfterViewInit,Inject,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch ,ThreeDeeTouch } from 'ionic-native';
@Component({
  templateUrl: 'my-page.html'
})
export class MyPage  implements AfterViewInit,OnInit{
  data:any;
  constructor(
    @Inject('data') private dataService,
    public navCtrl: NavController,
    public navParams: NavParams) {}

  ngOnInit(){
    //this.dataService.count();
    this.data = this.dataService.get();
  }
  ngAfterViewInit(){

 }

}
