import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Loginc } from '../../loginc';
import { CookieService } from 'ngx-cookie-service';
import { log } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  url: string = 'http://localhost:4000/register';
  n1: any = '';
  phono: any = '';
  email: any = '';
  passw: any = '';
  cpassw: any = '';
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  formData = {
    name: this.n1,
    email: this.email,
    phono: this.phono,
    pass: this.passw,
  };
  submit() {
    console.log(this.n1);
    if (this.passw != this.cpassw) {
      window.alert('password and confirm password is not same');
    }
    this.formData = {
      name: this.n1,
      email: this.email,
      phono: this.phono,
      pass: this.passw,
    };
    this.http.post(this.url, this.formData).subscribe((data: any) => {
      if (data.message == 'success') alert('Registration completed');
    });
  }
}
