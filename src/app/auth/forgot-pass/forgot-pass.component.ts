import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPassComponent implements OnInit {
  @ViewChild('f') recoverForm: NgForm;

  recoverauth: string;
  emailsent: boolean = false;
  responsemsg: any;
  apiresponse: any;

  constructor(private _authservice: AuthService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }


  onSubmit() {
      this.recoverauth = this.recoverForm.value.email;
      this.emailsent = true;
      this._authservice.recoverauth(this.recoverauth).subscribe(
        data => {
          this.apiresponse = data;
            if(this.apiresponse.message === 'EMAIL-NF') {
              this.responsemsg = "EMAIL not Found";
            } else if(this.apiresponse.message === 'ERROR') {
              this.responsemsg = "Oops! Something Went wrong. Contact Admin.";
            } else if(this.apiresponse.message === 'SUCCESS') {
              this.responsemsg = "Temporary Password is sent to your registered Email. Use 'Change Password' in settings option to reset password.";
            }
            this._cdr.markForCheck();
          
        } 
      );  

  }


 
}
