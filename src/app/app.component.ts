import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  query = `{ hello }`;
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sendQuery();
  }

  sendQuery() {
    this.http.post('/graphql', { query: this.query })
      .subscribe(response => {
        this.data = response;
      }, error => {
        console.error('Error:', error);
      });
  }
}
