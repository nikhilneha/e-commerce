import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import login, { SignUp } from './data-type';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient, private router:Router) { }

 
  
  signUpUser(data:SignUp)
  {
   this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((res)=>
   {

    localStorage.setItem('seller',JSON.stringify(res.body))
    this.router.navigate(['seller-home'])
   })
  }

  
  loginUser(data:login)
  {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>
    {
      if(res && res.body && res.body.length)
      {
        alert("your successfully login");
        localStorage.setItem('seller',JSON.stringify(res.body))
         this.router.navigate(['seller-home'])
      }
      else
      {
        alert("Email or password doesn't match")
      }
    })
  }
}
