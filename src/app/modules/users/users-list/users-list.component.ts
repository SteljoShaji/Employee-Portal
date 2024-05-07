import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  //properties
  allUsers:UserSchema[]=[]
  searchKey:string=""
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private api:ApiService){}


  //when UsersListComponent page is open call getUserList()
  ngOnInit(): void {
    this.getUserList()
    
  }
getUserList(){
  //when users list page open ,display all the users list  from json file by making an api call:http://localhost:3000/users
this.api.getallusers().subscribe({
  next:(result:any)=>{
    console.log(result);
    this.allUsers = result
    //this.sortByName()
    this.count = this.allUsers.length
  },
  error:(result:any)=>{
    console.log(result);
    alert("Error while fetching the data... Please try after some time!!!")
  }
})
}

deleteuser(id:any){
  this.api.deleteuser(id).subscribe({
    next:(res:any)=>{
      console.log("deleted successfully");
      this.getUserList()
    },
    error:(err:any)=>{
      console.log(err);
      alert("Cannot perform the action now... Please try after some time!!!")
    }
  })
}

sortById(){
  this.allUsers.sort((a:any,b:any)=>a.id-b.id)
}
sortByName(){
  this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
}

onTableDataChange(event: any) {
  this.page = event;
}
generatePDF(){
  let pdf = new jspdf()
  let head = [['User Id','Username','Email','Status']]
  let body:any = []
  this.allUsers.forEach((item:any)=>{
    body.push([item.id,item.name,item.email,item.active])
  })

  pdf.setFontSize(16)
  pdf.text("All Empolyee List",10,10)
  autoTable(pdf,{head,body})
  pdf.output('dataurlnewwindow')
  pdf.save("allUsers.pdf")
}
}
