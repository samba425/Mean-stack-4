import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  username;
  email;
 
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe( user => { 
      this.username = user.user.username;
      this.email = user.user.email;
    })
  }

}
