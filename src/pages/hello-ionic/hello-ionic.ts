import { Component ,OnInit,Inject} from '@angular/core';
import { App, ViewController,NavController, NavParams,LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyPage } from '../my-page/my-page';
import { AuthService } from '../home/auth.service';
import { User } from './user-model';
import { emailValidator,nicknameValidator } from './validator';

@Component({
  templateUrl: 'hello-ionic.html',
  providers:[AuthService]
})
export class HelloPage implements OnInit{
  flag='true';
  username = '';
  password = '';
  data:any;
  userForm: FormGroup;
  userInfo: User = new User();

  formErrors = {
    'userName': '',
    'nickName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'formError': '',
    'vcode':''
  }
  validationMessages = {
    'userName': {
      'required': '用户名必须输入。',
      'minlength': '用户名4到32个字符。'
    },
    'nickName': {
      'required': '昵称必须输入。',
      'minlength': '昵称2到32个字符。'
    },
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    },
    'password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要8位。'
    },
    'confirmPassword': {
      'required': '重复密码必须输入。',
      'minlength': '密码至少要8位。',
      'validateEqual': "两次输入的密码不一致。"
    },
    'vcode': {
      'required': '验证码必须输入。',
      'minlength': '4位验证码',
      'maxlength': '4位验证码'
    },
  };
  constructor(
    @Inject('data') private dataService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private service: AuthService,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public navCtrl: NavController
  ) {

    //let id = navParams.get('id');
    //let abc = navParams.get('abc');
    //let name = navParams.get('name');
    //console.log(id+'||'+abc+'|'+name);
  }
  ngOnInit(){
    this.buildForm();
    this.dataService.count();
    this.data = this.dataService.get();
    this.dataService.announceMission(this.data);//发布
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      "userName": [
        this.userInfo.userName,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      "password": [
        this.userInfo.password,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ],
     "confirmPassword": [
      this.userInfo.confirmPassword,
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    "email": [
      this.userInfo.email,
      [
        Validators.required,
        Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
      ]
    ]
    });
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    console.log(data);
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

  //doRegister() {
  //  if (this.userForm.valid) {
  //    this.userInfo = this.userForm.value;
  //    this.userRegisterService.register(this.userInfo)
  //      .subscribe(
  //        data => {
  //          //this.router.navigateByUrl("home");
  //        },
  //        error => {
  //          this.formErrors.formError = error.message;
  //          console.error(error);
  //        }
  //      );
  //  }else{
  //    this.formErrors.formError = "存在不合法的输入项，请检查。";
  //  }
  //  console.log(this.userInfo);
  //}
  //
  //testEmail(){
  //  let email = this.userForm.get("email").value;
  //  this.userRegisterService.testEmail(email)
  //    .subscribe(
  //      data => {
  //        console.log(data);
  //      },
  //      error => {
  //        console.error(error);
  //      }
  //    )
  //}
  //pushPage() {
  //  this.viewCtrl.dismiss();
  //  this.appCtrl.getRootNav().push(MyPage);
  //}





  go(){
    this.navCtrl.push(MyPage);
  }
  onClick() {
    console.log('auth result is: '
      + this.service.loginWithCredentials(this.username, this.password));
  }
  login(val){
    alert(JSON.stringify(val));
  }
  signup() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      // The auth subscribe method inside the app.ts will handle the page switch to home
    }, 3000);
  }
}


