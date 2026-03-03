import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './health.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl text-slate-900">Báo cáo & Thống kê</h1>
        <p class="text-slate-500">Dữ liệu phân tích sức khỏe học đường định kỳ</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Report Cards -->
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg">Tỷ lệ tiêm chủng</h2>
            <mat-icon class="text-brand-600">vaccines</mat-icon>
          </div>
          <div class="flex items-end gap-2 mb-2">
            <span class="text-3xl font-bold">98.5%</span>
            <span class="text-green-600 text-xs font-bold mb-1">+1.2%</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-brand-500 h-full" style="width: 98.5%"></div>
          </div>
          <p class="text-[10px] text-slate-400 mt-4 uppercase tracking-wider">Cập nhật: Học kỳ I - 2025-2026</p>
        </div>

        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg">Bệnh học đường</h2>
            <mat-icon class="text-amber-600">visibility</mat-icon>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-600">Cận thị</span>
              <span class="font-bold">24%</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-600">Cong vẹo cột sống</span>
              <span class="font-bold">5%</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-600">Sâu răng</span>
              <span class="font-bold">42%</span>
            </div>
          </div>
        </div>

        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg">Sử dụng BHYT</h2>
            <mat-icon class="text-blue-600">credit_card</mat-icon>
          </div>
          <div class="flex items-center justify-center py-4">
             <div class="relative w-24 h-24">
                <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                  <path class="text-slate-100" stroke-dasharray="100, 100" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-blue-500" stroke-dasharray="92, 100" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-sm font-bold">92%</div>
             </div>
          </div>
          <p class="text-center text-xs text-slate-500">Học sinh đã tham gia BHYT</p>
        </div>
      </div>

      <!-- Export Section -->
      <div class="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-xl mb-2">Xuất báo cáo định kỳ</h2>
          <p class="text-slate-500 text-sm">Hệ thống tự động tổng hợp dữ liệu cho các báo cáo gửi Phòng/Sở Giáo dục.</p>
        </div>
        <div class="flex gap-3">
          <button class="btn-secondary"><mat-icon>description</mat-icon> Báo cáo tháng</button>
          <button class="btn-primary"><mat-icon>file_download</mat-icon> Báo cáo học kỳ</button>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ReportsComponent {
  healthService = inject(HealthService);
}
