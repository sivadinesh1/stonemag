import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UrlidPipe } from '../../util/pipe/url-id.pipe';

@Component({
  selector: 'app-page',
  templateUrl: './commingsoon.component.html',
  styleUrls: ['./commingsoon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommingsoonComponent implements OnInit {
  public headline: string = 'title'; 
  story: { title: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private pipe: UrlidPipe,) { }

  ngOnInit() {

    this.story = { title: this.route.snapshot.params['title'] };
    
        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.title = params['title'];
          }
          );
    
        this.route.fragment.subscribe();
        console.log("IIIIIIDDDDD"+ this.story.title);
    
        const articleid = this.pipe.transform(this.story.title)

        console.log('page... '+ articleid);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
