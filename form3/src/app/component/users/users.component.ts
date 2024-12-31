import { ActivatedRoute } from '@angular/router';
import { routes } from './../../app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  id: any = '';
  data: any = '';
  valid: boolean = false;
  url: string = 'http://localhost:4000/details/:id';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    // this.route.params.subscribe((data: any) => {
    //   // this.id = data.id;
    //   this.id = data['id'];
    // });
    this.id = this.route.snapshot.params['id'];
  }
  get() {
    this.url = `http://localhost:4000/details/${this.id}`;
    this.http.get(this.url).subscribe((result: any) => {
      this.data = result.data[0];
      console.log(this.data);
      this.valid = true;
    });
  }
}
