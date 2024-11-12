import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, SidemenuComponent, RouterModule],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent implements OnInit {

  hasActivePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificar si la URL tiene una ruta activa
        this.hasActivePage = !!this.router.routerState.snapshot.root.firstChild;
      }
    });
  }

}
