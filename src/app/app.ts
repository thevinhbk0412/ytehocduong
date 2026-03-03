import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isSidebarOpen = true;

  navItems = [
    { path: '/', label: 'Tổng quan', icon: 'dashboard' },
    { path: '/medical-room', label: 'Phòng Y tế', icon: 'medical_information' },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
