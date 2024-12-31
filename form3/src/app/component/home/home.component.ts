import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [],
  template: `<div>
    <div class="c1">
      <div class="container">
        <h1>Welcome to Akrivia HCM</h1>
        <button (click)="onlogin()" class="button">login</button>
        <button (click)="onregister()" class="button">Register</button>
      </div>
    </div>
  </div> `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}
  onlogin() {
    this.router.navigateByUrl('/login');
  }
  onregister() {
    this.router.navigateByUrl('/register');
  }
}
