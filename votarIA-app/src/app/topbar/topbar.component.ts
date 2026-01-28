import {Component} from '@angular/core';
  import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';

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
