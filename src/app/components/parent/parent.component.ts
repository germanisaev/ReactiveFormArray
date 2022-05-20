import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public data: any = {
    general: {
      id: '372328932',
      name: 'gai isaev',
      age: '52',
      email: 'gai70@gmail.com'
    },
    loan: {
      role: 'Frontend Developer',
      company: 'Aman Group',
      experience: '15',
      salary: '28000'
    },
    guarantors: [
      {
        userid: '314568937',
        username: 'german abramov',
        userrole: '1'
      },
      {
        userid: '214327734',
        username: 'david isaev',
        userrole: '9'
      },
      {
        userid: '714327734',
        username: 'sofia isaev',
        userrole: '10'
      }
    ]
  };

  selectRoles = [
    {
      key: 1,
      value: 'software developer'
    },
    {
      key: 2,
      value: 'web designer'
    },
    {
      key: 3,
      value: 'ux/ui'
    },
    {
      key: 4,
      value: 'qa'
    },
    {
      key: 5,
      value: 'devops'
    },
    {
      key: 6,
      value: 'architect'
    },
    {
      key: 7,
      value: 'team leader'
    },
    {
      key: 8,
      value: 'project manager'
    },
    {
      key: 9,
      value: 'product manager'
    },
    {
      key: 10,
      value: 'hr'
    }
  ];

  detailsForm!: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, ) { }

  get guarantors() {
    return this.detailsForm.controls["guarantors"] as FormArray;
  }

  ngOnInit(): void {
    this.detailsForm = this.formBuilder.group({
      general: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        age: ['', Validators.required],
        email: ['', Validators.required],
      }),
      loan: this.formBuilder.group({
        role: ['', Validators.required],
        company: ['', Validators.required],
        experience: ['', Validators.required],
        salary: ['', Validators.required],
      }),
      guarantors: this.formBuilder.array([])
    });

    this.detailsForm.get('general')?.setValue(this.data.general);
    this.detailsForm.get('loan')?.setValue(this.data.loan);
    this.initFormArray(this.data.guarantors);
  }

  createForms(guarantor: any): FormGroup {
    return this.formBuilder.group({
      userid: [{ value: guarantor.userid, disabled: true }],
      username: [{ value: guarantor.username, disabled: true }],
      userrole: [{ value: guarantor.userrole, disabled: false }]
    });
  }

  initFormArray(guarantor: any[]) {
    const formArray = this.detailsForm.get('guarantors') as FormArray;
    guarantor.map(item => {
      formArray.push(this.createForms(item));
    });
    this.detailsForm.setControl('guarantors', formArray);
  }
  

  onSubmit(): void {
    this.submitted = true;
    
    if (this.detailsForm.invalid) {
      return;
    }

    console.log(this.detailsForm.value)
  }

}
