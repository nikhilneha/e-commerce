import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignUp } from '../data-type';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

 constructor(private userServe:UserService){}
  register:FormGroup=new FormGroup({
    name:new FormControl(''),
    password:new FormControl(''),
    email:new FormControl('')
  })

  signUp(data:SignUp)
  {
     console.log(data)
  }
}
