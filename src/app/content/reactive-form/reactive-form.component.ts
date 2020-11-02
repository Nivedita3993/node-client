import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { City } from 'src/app/models/city';
import { Gender } from 'src/app/models/gender';
import { Language } from 'src/app/models/language';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  providers: [FormService]
})
export class ReactiveFormComponent implements OnInit {
  cities: Array<City> = [];
  languages: Array<Language> = [];
  gender: Array<Gender> = [];

  bookingDetails: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.cities = [
      { id: '1', code: 'HYD', valueStr: 'Hyderabad' },
      { id: '2', code: 'CHN', valueStr: 'Chennai' },
      { id: '3', code: 'BNG', valueStr: 'Bangalore' },
      { id: '4', code: 'DHL', valueStr: 'Delhi' },
      { id: '5', code: 'KOL', valueStr: 'Kolkatta' },
      { id: '6', code: 'AMD', valueStr: 'Ahemdabad' },
      { id: '7', code: 'BHU', valueStr: 'Bhubaneshwar' },
      { id: '8', code: 'IND', valueStr: 'Indore' },
      { id: '9', code: 'CHD', valueStr: 'Chandigarh' },
      { id: '10', code: 'MUM', valueStr: 'Mumbai' },
    ];

    this.languages = [
      { id: '1', code: 'CPP', valueStr: 'C++', checked: false },
      { id: '2', code: 'PYTN', valueStr: 'Python', checked: false },
      { id: '3', code: 'JS', valueStr: 'JavaScript', checked: false },
      { id: '4', code: 'PHP', valueStr: 'PHP', checked: false },
      { id: '5', code: 'JAVA', valueStr: 'Java', checked: false },
    ];

    this.gender = [
      { id: '1', code: 'F', valueStr: 'Female' },
      { id: '2', code: 'M', valueStr: 'Male' },
      { id: '3', code: 'O', valueStr: 'Other' },
    ];

    this.bookingDetails = this.fb.group({
      fname: this.fb.control(''),
      lname: this.fb.control(''),
      age: this.fb.control(''),
      dob: this.fb.control(''),
      bookTime: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      cpassword: this.fb.control(''),
      gender: this.fb.control(''),
      languages: this.fb.array([]),
      city: this.fb.control('')
    });
  }

  ngOnInit(): void {
  }

  getSelectedLang(evnt, data: Language): void {
    data.checked = evnt.target.checked;
    const checkedLang: FormArray = this.bookingDetails.get('languages') as FormArray;

    if (data.checked) {
      checkedLang.push(new FormControl(data.code));
    } else if (!data.checked) {
      let index = checkedLang.controls.findIndex((ele: FormControl) => ele.value === data.code);

      if (index > -1) {
        checkedLang.controls.splice(index, 1);
      }
    }
  }

  submitForm(): void {
    // console.log(this.bookingDetails.value);
    this.formService.saveFormDetails(this.bookingDetails.value).subscribe(data => {
      console.log(data);
    });
  }
}
