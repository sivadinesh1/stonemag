import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-skandaguruhome',
  templateUrl: './skandaguruhome.component.html',
  styleUrls: ['./skandaguruhome.component.css']
})
export class SkandaguruhomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Skandaguru Spritiual Magazine in Tamil");
  }

}
