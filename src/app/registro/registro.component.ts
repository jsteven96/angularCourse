import { Person } from './../person';
import { Component, OnInit } from '@angular/core';
import { EnrollService } from '../enroll.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  personModel = new Person('Juan','Alimaña','male');
  genreIncorrect = false;
  public genres = ['male', 'female'];
  public submitted:boolean = false;
  public msgError = '';
  constructor(private enroll: EnrollService) { }

  ngOnInit(): void {
  }

  validateGenre(genre){
    if(genre === 'default'){
      this.genreIncorrect = true;
    }else{
      this.genreIncorrect = false;
    }

  }

  onSubmit(){
    this.submitted = true;
    this.enroll.register(this.personModel).subscribe(
      response => console.log('Success' ,response),
      error => {
        console.error(error);
        this.msgError = error;
        this.submitted = false;
      }
    )
  }

}
