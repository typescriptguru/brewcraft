import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/index';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({

  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};
  msgs: Message[] = [];
  onRegister: Boolean = true;
  onEmail: Boolean = true;
  rePassword: String = '';
  onPassword: Boolean = true;
  onExist: Boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
  ) { }

  register(): void {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.onRegister = true;
    this.onPassword = true;
    if (this.user.firstname == null || this.user.secondname == null || this.user.password == null || this.rePassword == null) {
      this.onRegister = false;
    }

    if (this.user.password !== this.rePassword && this.user.password !== null) {
      this.onPassword = false;
    }

    this.onEmail = re.test(this.user.username);
    
    if (this.onEmail === true && this.onRegister === true && this.onPassword === true) {
      this.userService.signup(this.user)
        .then(res => {
          console.log(res);
          this.msgs = [];
          if (res.success) {
            this.msgs.push({ severity: 'success', summary: 'Successful', detail: res.message });
            // setTimeout(() => { this.router.navigate(['/login']); }, 2000);
          } else {
            // this.onExist = false;
            this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
          };
        });
    }

  }
  goBack(): void {
    this.location.back();
  }
}
