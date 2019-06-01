import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-erros',
  templateUrl: './erros.component.html',
  styleUrls: ['./erros.component.scss']
})
export class ErrosComponent implements OnInit {

  public status: string;
  public message: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.status = this.route.snapshot.data['status'];
    this.message = this.route.snapshot.params['message'];
  }

}
