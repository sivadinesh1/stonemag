import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lubhome',
  templateUrl: './lubhome.component.html',
  styleUrls: ['./lubhome.component.css']
})
export class LubhomeComponent implements OnInit { 

  constructor(private titleService: Title) { 
    
  }

  ngOnInit() {
    this.titleService.setTitle("LUB Karnataka Magazine");
  }
  
  ngAfterViewInit() {
  
    // const mainDiv = document.getElementById('mainDIV');
    // mainDiv.scrollTop = 0;

  }


  
  
  //  scrollFunction() {
  //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //         document.getElementById("myBtn").style.display = "block";
  //     } else {
  //         document.getElementById("myBtn").style.display = "none";
  //     }
  // }
  
  // When the user clicks on the button, scroll to the top of the document
  //  topFunction() {
  //     document.body.scrollTop = 0;
  //     document.documentElement.scrollTop = 0;
  // }
}
