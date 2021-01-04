import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// import {HardcodedAuthenticationService} from '../service/hardcoded-authentication.service';
import {AuthenticationService} from '../service/authentication.service';
// Need to import User here

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {

  loginUsername = 'Christian1';
  loginPassword = '';
  firstname = '';
  lastname = '';
  username = '';
  password = '';
  email = '';
  errorMessage = 'Invalid Credentials. Please try again';
  invalidLogin = false;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  // handleLogin = () => {
  //   if (this.hardcodedAuthenticationService.authenticate(this.loginUsername, this.loginPassword)) {
  //     this.router.navigate([`main/${this.loginUsername}`]); // ***** need to get this settled
  //     this.invalidLogin = false;
  //   } else {
  //     this.invalidLogin = true;
  //   }
  // }
  // ***** will need to switch this over to a real authentication piece with JWT

  handleJWTAuthLogin = () => {
    this.authenticationService.executeJWTAuthenticationService(this.loginUsername, this.loginPassword)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`main/${this.loginUsername}`]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  handleRegistration = () => {
    console.log('hello');
  } // ***** need to figure out how this would look with JWT

}
