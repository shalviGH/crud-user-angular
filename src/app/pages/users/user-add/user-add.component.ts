import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { TitleComponent } from '../../../shared/title/title.component';
import { UserService } from '../../../services/User.Service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert-service/alert-service.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    SidemenuComponent, 
    TitleComponent,
    ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  
})

export default class UserAddComponent {

  userForm: FormGroup;

  public UserService = inject(UserService);

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router, private alertService:  AlertService ){
    
      this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    });
   
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      
      this.userService.createUser(user).subscribe({
        next: (user) => {
          console.log('Usuario creado y lista recargada:', user);
          this.userService.getUsers(); 
          this.userForm.reset();
          this.alertService.showSuccess("Usuario Creado con exito");
           this.router.navigate(['/user-control/users']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al crear el usuario:', error);
        }
      });
    }
  }

  public cancel(){
      this.router.navigate(['/user-control/users'])
  }
}
