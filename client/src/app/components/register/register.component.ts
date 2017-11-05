import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


form : FormGroup;
message;
messageClass;

  constructor( private formBuilder: FormBuilder,private auth: AuthService, private router: Router) { 

    this.createRegisterForm();
  }
 createRegisterForm() {
  this.form = this.formBuilder.group({
    email : ['', Validators.required],
    username : ['', Validators.required],
    password: ['', Validators.required]
    
  })
}

formRegister() {
const user = {
  email: this.form.get('email').value,
  username: this.form.get('username').value,
  password: this.form.get('password').value,
} 

  this.auth.register(user).subscribe(data => {
    console.log("my response", data)
    if(!data.success) {
    this.messageClass  = 'alert alert-danger';
    this.message =  data.message;
    } else {
 this.messageClass  = 'alert alert-success';
    this.message =  data.message;
    setTimeout( () => {
    this.router.navigate(['/login'])
    },3000)}
  })
}
  ngOnInit() {
  }

}
