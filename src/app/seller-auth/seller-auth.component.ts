import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

showLogin=false;

register:FormGroup=new FormGroup({
  Name:new FormControl(''),
  Password:new FormControl(''),
  Email:new FormControl('')
})

login:FormGroup=new FormGroup({
  Email:new FormControl(''),
  Password:new FormControl('')
})

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
