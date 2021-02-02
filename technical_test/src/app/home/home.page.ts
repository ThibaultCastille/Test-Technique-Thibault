import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  loginData = {
    email: '',
    password: ''
  };

  Validate() {
    this.loginData.email = localStorage.getItem('email');
    this.loginData.password = localStorage.getItem('password');
    console.log(this.loginData.email)
    console.log(this.loginData.password)
  //  this.router.navigate(['/home'])
  }

  ngOnInit(){
    this.Validate()
  }



}
