import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUnames = ['Chris', 'Anna']

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      })
      ,
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
      });

      this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
      )

      this.signupForm.patchValue({
        'userData': {
          'email': 'rukon-it@live.com'
        }
      })
 
  }

  onSubmit() {
    console.log(this.signupForm.value)
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push( control )
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean } {
    if(this.forbiddenUnames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test2@test.com') {
          resolve({'emailIsForbidden': true})
        }
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
