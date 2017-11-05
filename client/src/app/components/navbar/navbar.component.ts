import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private flashmessage: FlashMessagesService) { }

  ngOnInit() {
  }

  logout(){
   this.auth.logOut();
   this.flashmessage.show('You Logout Successfully', { cssClass: 'alert-info'});
   this.router.navigate(['/']);
  }

}
