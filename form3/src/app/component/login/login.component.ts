import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Cre } from '../../cre';
import { log } from 'console';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  url: string = 'http://localhost:4000/login';
  name1: any = '';
  password: any = '';
  form = { name: this.name1, password: this.password };
  constructor(
    private cookieService: CookieService,
    private route: Router,
    private http: HttpClient
  ) {}
  login() {
    const cookieUser = this.cookieService.get(this.name1);
    if (!cookieUser && !(cookieUser == this.password)) {
      this.route.navigateByUrl('/register');
    }
    console.log('login');

    this.form = { name: this.name1, password: this.password };
    console.log(this.form);
    this.http.post(this.url, this.form).subscribe((data: any) => {
      alert(data.message);
      if (data.message == 'login successfull')
        this.route.navigateByUrl(`/login/${this.name1}`);
    });
  }
}
