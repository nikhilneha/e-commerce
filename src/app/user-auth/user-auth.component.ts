import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import login, { Cart, SignUp, product } from '../data-type';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

 constructor(private userServe:UserService,private router:Router,private prodServe:ProductService){}

 showUserLogin:boolean=false
 

  userRegister:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
    email:new FormControl('',[Validators.required,Validators.email])
  })

  userLogin:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)])
  })

  ngOnInit(): void {
    this.userServe.userReload()
    
  }
  signUp(data:SignUp)
  {
     this.userServe.userSignUp(this.userRegister.value)
  }
  newloginUser(data:login)
  {
        this.userServe.loginUser(this.userLogin.value)
        
        setTimeout(()=>{this.localCartToRemoteCart()},400)
      
  }
  openUserLogin()
  {
    this.showUserLogin=true
  }
  openUserSignUp()
  {
    this.showUserLogin=false
  }

  localCartToRemoteCart()
  {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.log(userId)
    if(data)
    {
       let cartDataList:product[] = JSON.parse(data);
      cartDataList.forEach((product:product,index)=>{
        let cartData:Cart={
           ...product,
           productId:product.id,
           userId
        };
         delete cartData.id
        setTimeout(()=>{
          this.prodServe.addCart(cartData).subscribe((res)=>{
            if(res)
            {
              console.log("item stored in db");
            }
           })
          },500);
           if(cartDataList.length===index+1)
           {
            localStorage.removeItem('localCart')
           }
         
           })
      }
      setTimeout(()=>{
        this.prodServe.getCartList(userId)
          },2000)
    }

    
  }



