import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-digitalpengalhome',
  templateUrl: './digitalpengalhome.component.html',
  styleUrls: ['./digitalpengalhome.component.css']
})
export class DigitalpengalhomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("LUB Karnataka Magazine");
  }

}
