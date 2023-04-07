import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from './data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp)
  {
    this.http.post(`http://localhost:3000/users`,user,{observe:"response"}).subscribe((res)=>{
      localStorage.setItem('user',JSON.stringify(res.body))
    
    })
  }
}
