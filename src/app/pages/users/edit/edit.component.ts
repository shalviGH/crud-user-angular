import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/User.Service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TitleComponent } from '../../../shared/title/title.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/User-Response';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../services/alert-service/alert-service.component';

@Component({
  standalone: true,
  imports: [  CommonModule, TitleComponent, ReactiveFormsModule ],
  templateUrl: './edit.component.html',
})

export default class EditComponent implements OnInit {
  
  public userForm: FormGroup;
  public userId: number=0;

  
  
  private route  = inject( ActivatedRoute);
  private userService = inject(UserService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id)) 
    )
  );

  


  ngOnInit(): void {
    // Obtén el ID del usuario de la ruta
    this.userId = + this.route.snapshot.paramMap.get('id')!;
    
    // Inicializa el formulario
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', [Validators.required]]
    });

    // Cargar datos del usuario
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }




  constructor(
    private fb : FormBuilder,  
    private router: Router, 
    private alerService: AlertService ){

    this.userForm = this.fb.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    });
 
  }


   // Método para guardar los cambios
   onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value, this.userId).subscribe({
        next: () => {
          this.alerService.showSuccess("Usuario Actualizado con exito")
          this.router.navigate([`/user-control/edit/${this.userId}`]);

          this.userService.getUsers();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error actualizando usuario:', error);
        }
      });
    }
  }


 
  

}
