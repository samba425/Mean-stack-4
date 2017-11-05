import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message;
messageClass;
form : FormGroup;

  constructor(private formbuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.createLoginForm();
   }

  createLoginForm() {
     this.form = this.formbuilder.group({
       username: ['',Validators.required],
       password: ['', Validators.required]
     })
  }

 loginForm() {
   const user = {
     username: this.form.get('username').value,
     password: this.form.get('password').value
   }
   this.auth.login(user).subscribe( data => {
        console.log("my response", data)
    if(!data.success) {
    this.messageClass  = 'alert alert-danger';
    this.message =  data.message;
    } else {
 this.messageClass  = 'alert alert-success';
    this.message =  data.message;
    this.auth.storeToken(data.token,data.user);
    setTimeout( () => {
    this.router.navigate(['/dashboard'])
    },3000)
  }
   }); 
   
 }

  ngOnInit() {
  }

}
