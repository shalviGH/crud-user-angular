import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: `

    <h1 class="text-3xl mb-5 mt-3 text-center">{{title}}</h1>
  
  `,
})
export class TitleComponent {
  
  @Input({required:true})  title: string='';   

}
