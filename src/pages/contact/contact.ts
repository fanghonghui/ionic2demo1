import { Component,OnInit, ViewChild, ElementRef,AfterViewInit ,Inject} from '@angular/core';
import { NavController } from 'ionic-angular';
import { flyIn } from '../animations/fly-in';
import { MyPage } from '../my-page/my-page';
import { HelloPage } from '../hello-ionic/hello-ionic';
declare var BMap;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  animations: [
    flyIn
  ],
  styles: [`
        baidu-map{
            width: 100%;
            height: 500px;
            display: block;
        }
    `]

})
export class ContactPage  implements AfterViewInit,OnInit{
  @ViewChild('container') mapElement: ElementRef;
  container: any;
  data:any;
  constructor(
    @Inject('data') private dataService,
    private navCtrl: NavController) {


  }
  ionViewLoaded() {
    this.loadMap();
  }
  ngOnInit(){
    //如果这个页面加载过了共享数据就不更新了,这时可以用订阅和发布更新或操作数据，定时器也行
    this.data = this.dataService.get();
    let self  = this;
    this.dataService.missionAnnounced$.subscribe(
      mission => {
        self.data = mission;
      });//订阅
  }


  loadMap() {
    var map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
    var point = new BMap.Point(120.219375,30.259245); // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    //创建小狐狸
    var pt = new BMap.Point(120.219375,30.259245);
    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
    var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
  }
  ngAfterViewInit() {
    this.loadMap();

    //let update = function(){
    //  this.data = this.dataService.get();
    //}.bind(this);
    //setInterval(update,2000);
  }

  go(){
    this.navCtrl.push(HelloPage);

  }

}
