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

  navGroups = [
    {
      label: 'Chính',
      items: [
        { path: '/', label: 'Tổng quan', icon: 'dashboard' },
        { path: '/students', label: 'Hồ sơ học sinh', icon: 'groups' },
      ]
    },
    {
      label: 'Chuyên môn',
      items: [
        { path: '/medical-room', label: 'Phòng Y tế', icon: 'medical_information' },
        { path: '/nutrition', label: 'Dinh dưỡng & ATTP', icon: 'restaurant' },
        { path: '/counseling', label: 'Tư vấn tâm lý', icon: 'psychology' },
      ]
    },
    {
      label: 'Hoạt động',
      items: [
        { path: '/education', label: 'Giáo dục sức khỏe', icon: 'campaign' },
        { path: '/reports', label: 'Báo cáo & Thống kê', icon: 'analytics' },
      ]
    },
    {
      label: 'Hệ thống',
      items: [
        { path: '/settings', label: 'Cấu hình', icon: 'settings' },
      ]
    }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
