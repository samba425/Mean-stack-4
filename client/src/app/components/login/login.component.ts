import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthGuard } from '../../services/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message;
messageClass;
prviousUrl;
form : FormGroup;

  constructor(private formbuilder: FormBuilder, private auth: AuthService, private router: Router, private authguard: AuthGuard) {
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
      if(this.prviousUrl) {
        this.router.navigate([this.prviousUrl]);
      } else {
    this.router.navigate(['/dashboard']);
      }
    },3000)
  }
   }); 
   
 }

  ngOnInit() {
    if(this.authguard.redirectUrl){
       this.messageClass = "alert alert-info";
       this.message=`Please login to get into  ${this.authguard.redirectUrl} page`;
       this.prviousUrl = this.authguard.redirectUrl;
       this.authguard.redirectUrl = undefined;
    }
  }

}
