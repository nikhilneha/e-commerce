import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import login, { SignUp } from './data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp)
  {
    this.http.post(' http://localhost:3000/users',user,{observe:"response"}).subscribe((res)=>{
    if(res)
    {  
    localStorage.setItem('user',JSON.stringify(res.body))
      this.router.navigate([''])
    }
    })
  }
    loginUser(data:login)
    {
     this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      {observe:"response"}).subscribe((res:any)=>{
        if(res && res.body && res.body.length) 
        {
          alert("you are successfully login")
          
          localStorage.setItem('user',JSON.stringify(res.body[0]))
          this.router.navigate([''])
        }
        else
        {
          alert("Email or password not match")
        }
      })
    }
  userReload()
    {
      if(localStorage.getItem('user'))
      {
        this.router.navigate([''])
      }
    }
    getuserRegister(){
      return localStorage.getItem('userregister');
    }  
}

