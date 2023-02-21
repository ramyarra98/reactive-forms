import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard-model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formvalue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData ! : any;
  showadd! : boolean;
  showupdate!:boolean;
  isVisible = false;
  constructor(private formbuilber:FormBuilder,
              private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilber.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      company:[''],
      gender:[''],
      DOB:[''],
      password:[''],
      conformpassword:[''],
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName= this.formvalue.value.firstName;
    this.employeeModelObj.lastName=this.formvalue.value.lastName;
    this.employeeModelObj.email=this.formvalue.value.email;
    this.employeeModelObj.mobile=this.formvalue.value.mobile;
    this.employeeModelObj.company=this.formvalue.value.company;
    this.employeeModelObj.gender= this.formvalue.value.gender;
    this.employeeModelObj.DOB=this.formvalue.value.DOB;
    this.employeeModelObj.password=this.formvalue.value.password;
    this.employeeModelObj.conformpassword=this.formvalue.value.conformpassword;

    this.api.postEmploye(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("emploee added succesfully")
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    },
    err =>{
      alert("somthing went wrong")
    })
    this.showadd =false
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
     this.employeeData = res;
    })
  }
onedit(row : any){
  this.showadd =false;
    this.showupdate=true;
  this.employeeModelObj.id = row.id;
  this.formvalue.controls["firstName"].setValue(row.firstName)
  this.formvalue.controls["lastName"].setValue(row.lastName)
  this.formvalue.controls["email"].setValue(row.email)
  this.formvalue.controls["mobile"].setValue(row.mobile)
  this.formvalue.controls["company"].setValue(row.company)
  this.formvalue.controls["gender"].setValue(row.gender)
  this.formvalue.controls["DOB"].setValue(row.DOB)
  this.formvalue.controls["password"].setValue(row.password)
  this.formvalue.controls["conformpassword"].setValue(row.conformpassword)
}
updateEmployeeDetails(){
 
  this.employeeModelObj.firstName= this.formvalue.value.firstName;
  this.employeeModelObj.lastName=this.formvalue.value.lastName;
  this.employeeModelObj.email=this.formvalue.value.email;
  this.employeeModelObj.mobile=this.formvalue.value.mobile;
  this.employeeModelObj.company=this.formvalue.value.company;
  this.employeeModelObj.gender= this.formvalue.value.gender;
  this.employeeModelObj.DOB=this.formvalue.value.DOB;
  this.employeeModelObj.password=this.formvalue.value.password;
  this.employeeModelObj.conformpassword=this.formvalue.value.conformpassword;

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
      .subscribe(res=>{    
    alert("update successfully")
    this.formvalue.reset();
    this.getAllEmployee();
   
  })
  this.showupdate =false
}

deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("deleted employee")
    this.formvalue.reset();
    this.getAllEmployee();
  })
}

  clickaddemployee(){
    this.formvalue .reset();
    this.showadd =true;
    this.showupdate=false;
  }



  handleCancel(): void {
    this.isVisible = false;
  }
}
