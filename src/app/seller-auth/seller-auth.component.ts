import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  name:new FormControl(''),
  password:new FormControl(''),
  email:new FormControl('')
})

login:FormGroup=new FormGroup({
  email:new FormControl(''),
  password:new FormControl('')
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

    
  }
}
