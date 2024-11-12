import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { TitleComponent } from '../../../shared/title/title.component';
import { UserService } from '../../../services/User.Service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { AlertService } from '../../../services/alert-service/alert-service.component';

@Component({
  standalone: true,
  imports: [CommonModule, SidemenuComponent, 
    TitleComponent, 
    ReactiveFormsModule,  RouterModule],
  templateUrl: './user-list.component.html',
})

export default class UserListComponent {
 

  public UserService = inject(UserService);

  constructor( private alertService: AlertService ){
    console.log(this.UserService.users());
  }


  deleteUser(id: number): void {
    this.alertService.confirmDelete().then((result) => {
      if (result.isConfirmed) {

    this.UserService.deleteUser(id).subscribe({
      next: () => {
        console.log('Usuario eliminado');
        this.UserService.getUsers(); 
        this.alertService.showSuccess("EL Usuario se elimino con exito ");
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
        this.UserService.getUsers();
      }
    });
  }
  })
  }
  


}
