import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _httpClient: HttpClient,private router: Router,  private googlePlus: GooglePlus, private fb: Facebook) { }
  userData: any = {};

  loginData = {
    email: '',
    password: ''
  };

  
  doFbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => this.ValidateFacebook(res))
  .catch(e => console.log('Error logging into Facebook', e));

  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  ValidateFacebook(result) {
    localStorage.setItem('email', result.authResponse.userID)
    localStorage.setItem('password', result.authResponse.accessToken)
    this.router.navigate(['/home'])
  }

  ValidateGoogle(result) {
    localStorage.setItem('email', result.displayName)
    localStorage.setItem('password', result.accessToken)
    this.router.navigate(['/home'])
  }

  doGoogleLogin() {
    this.googlePlus.login({})
      .then(result => {this.ValidateGoogle(result)})
      .catch(err => {alert('error: ' + err);});
  //}
  }

  RegisterInfo() {
    let postData = {
            "key1": this.loginData.email,
            "key2": this.loginData.password,
    }
    this._httpClient.post("https://zopatw7dn8.execute-api.us-east-2.amazonaws.com/default/LoginWriteSeverless", postData)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }

  Validate() {
    localStorage.setItem('email', this.loginData.email);
    localStorage.setItem('password', this.loginData.password);
    this.router.navigate(['/home'])
  }

  Login() {
    this._httpClient.get("https://itqx5sskv4.execute-api.us-east-2.amazonaws.com/default/LoginReadSeverless")
      .subscribe((data:any) => {
        data.Items.map((person, index) => (
          person.Username === this.loginData.email ? (person.Password === this.loginData.password ? this.Validate() : console.log("no")) : console.log("no")
      ));
       }, error => {
        console.log(error);
      });
  }


  ngOnInit() {
  }

}
