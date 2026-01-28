import {Component} from '@angular/core';
  import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';
  
/**
 * @component TopbarComponent
 * @description A standalone navigation or header component that displays the application's top bar, 
 * utilizing Angular Material buttons and icons.
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class TopbarComponent {
  constructor() {    
  }
}
