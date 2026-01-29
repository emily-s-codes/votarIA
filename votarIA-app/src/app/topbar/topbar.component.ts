import {Component, inject} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../core/services/theme.service';

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
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
    console.log('Theme toggled', this.themeService.isDarkMode());
  }
}
