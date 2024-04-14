import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm!: FormGroup;

  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray
  }

  addAlternateEmails(){
    this.alternateEmails.push(this.fb.control(''));
  }

  onSubmit(){
    console.log(this.registrationForm.value);
  }


  constructor(private fb:FormBuilder){
  }

  ngOnInit() {
     //using FormBuilder
  this.registrationForm = this.fb.group({
    userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/admin/)]],
    email:[''],
    subscribe:[''],
    password:[''],
    confirmPassword:[''],
    address:this.fb.group({
      city:['city'],
      state:['state'],
      postalCode:['12345']
    }),
    alternateEmails: this.fb.array([])
  },{validator: PasswordValidator})
      
    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checkedValue =>{
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email?.setValidators(Validators.required);
      }else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    })
  }

 


  //manually creating instances without FormBuilderService
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Pratik'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  loadApiData(){
    //all the form control values need to be provided, if only some formControl data provided wont work
    //For this case, use pathcValue method
    // 
    // this.registrationForm.setValue({
    //   userName:'Pratik',
    //   password:'root',
    //   confirmPassword:'root',
    //   address:{
    //     city:'City',
    //     state:'State',
    //     postalCode:'12345'
    //   }
    // })
    this.registrationForm.patchValue({
      userName:'Pratik',
      password:'root',
      confirmPassword:'root',
    })

  }


}
