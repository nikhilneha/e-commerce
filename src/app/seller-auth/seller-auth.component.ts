import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import login, { SignUp } from '../data-type';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

showLogin=false;

register:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
  password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
  email:new FormControl('',[Validators.required,Validators.email])
})

login:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)])
})

constructor(private selServe:SellerService, private router:Router){}


userSignUp(data:SignUp)
{
  this.selServe.signUpUser(this.register.value)
}
userLogin()
{
  this.selServe.loginUser(this.login.value)
}
openLogin()

{
  this.showLogin=true;
}
openSignUp()
{
  this.showLogin=false
}
  ngOnInit(): void {

    this.selServe.reloadSeller()
  }
}



