import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ForbiddenNameValidator } from '../shared/forbidden-name.validator';
import { PasswordValidator } from '../shared/password.validator';
import {EnrollService} from '../enroll.service';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {
    registrationForm = new FormGroup({
    userName: new FormControl('Rodrigo'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    /*
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })*/
  });

  constructor(private formBuilder: FormBuilder, private eService: EnrollService) {
    this.registrationForm = this.formBuilder.group({
      userName: ['Andres', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/user/)]],
      password: 'pass',
      confirmPassword: 'pass',
      email: null,
      alternateEmails: this.formBuilder.array([]),
      subscribe: null
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges.subscribe(
      (value) => {
        const email = this.registrationForm.get('email');
        if(value){
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }

        email.updateValueAndValidity();
        console.log(value);
      }
    );
   }

  ngOnInit(): void {
  }

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  changeValues(){
    this.registrationForm.setValue(
      {
        userName: 'Andres',
        password: 'pass',
        confirmPassword: 'pass',
        /*
        address: {
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: 200020
        }*/
      
      }
    );
  }

  changeName(){
    this.registrationForm.patchValue(
      {
        userName: 'Javier'
      }
    )
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.formBuilder.control(''));
  }

  onSubmit(){
    console.log('Sending data');
    this.eService.enroll(this.registrationForm.value).subscribe(
      response => console.log('Success!', response)
    )
  }


}
