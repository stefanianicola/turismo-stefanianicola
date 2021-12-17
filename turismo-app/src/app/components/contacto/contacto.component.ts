import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

contactForm = this.fb.group({
  firstName:['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    email: ['',Validators.required]
  }),
})

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.contactForm.value);
  }

}
