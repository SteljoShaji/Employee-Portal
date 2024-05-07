import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../modules/users/users.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  url="./assets/images/admin.jpeg"
  editAdminStatus:boolean = false
  admin: UserSchema = {}
  @Output() onUpdate = new EventEmitter()

  constructor(private api:ApiService){

    this.api.adminDetails().subscribe({
      next:(res:UserSchema)=>{
        console.log(res);
        this.admin = res
        if( res.picture){
          this.url = res.picture
        }
      }
    })
  }

  editadminbtnclick(){
    this.editAdminStatus = true
   
  }
  getFile(event:any){
    console.log(event.target.files[0]);
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      this.url = event.target.result
      this.admin.picture = this.url
    }
  }
  update(){
    this.api.updateAdmin(this.admin).subscribe({
      next:(res:any)=>{
        console.log(res);
      //save details in local storage
       localStorage.setItem("admin_name",res.name)
       localStorage.setItem("admin_password",res.password)
       
        alert("Admin details upsated successfully...")
        this.editAdminStatus = false
        this.onUpdate.emit(res.name)

      },
      error:(err:any)=>{
        console.log(err);
        alert("Updation failed!!! server currently unavailable.")
      }
    })
  }
  cancel(){
    this.editAdminStatus = false
  }
}
