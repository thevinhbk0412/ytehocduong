import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './health.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-education',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl text-slate-900">Giáo dục & Truyền thông sức khỏe</h1>
        <p class="text-slate-500">Xây dựng cộng đồng học đường khỏe mạnh và chủ động</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Campaigns -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4 flex items-center gap-2">
              <mat-icon class="text-brand-600">campaign</mat-icon>
              Chiến dịch & Sự kiện
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (camp of healthService.campaigns(); track camp.id) {
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-2">
                    <span class="text-[10px] px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full font-bold">
                      {{ camp.status }}
                    </span>
                  </div>
                  <h3 class="font-bold text-slate-900 mb-1">{{ camp.name }}</h3>
                  <p class="text-xs text-slate-500 mb-3 flex items-center gap-1">
                    <mat-icon class="text-xs">event</mat-icon> {{ camp.date }}
                  </p>
                  <p class="text-xs text-slate-600">Đối tượng: {{ camp.target }}</p>
                  <button class="mt-4 text-xs text-brand-600 font-bold hover:underline">Xem kế hoạch chi tiết →</button>
                </div>
              }
            </div>
          </div>

          <!-- Educational Materials -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4">Thư viện tài liệu số</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                <div class="flex items-center gap-3">
                  <mat-icon class="text-red-500">picture_as_pdf</mat-icon>
                  <div>
                    <p class="text-sm font-medium">Cẩm nang phòng chống dịch bệnh theo mùa</p>
                    <p class="text-[10px] text-slate-400">PDF • 2.4 MB • Cập nhật 2 ngày trước</p>
                  </div>
                </div>
                <button class="text-slate-400 hover:text-brand-600"><mat-icon>download</mat-icon></button>
              </div>
              <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                <div class="flex items-center gap-3">
                  <mat-icon class="text-blue-500">video_library</mat-icon>
                  <div>
                    <p class="text-sm font-medium">Video hướng dẫn sơ cứu cơ bản cho học sinh</p>
                    <p class="text-[10px] text-slate-400">MP4 • 15:30 • Cập nhật tuần trước</p>
                  </div>
                </div>
                <button class="text-slate-400 hover:text-brand-600"><mat-icon>play_circle</mat-icon></button>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Training Sessions -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4">Tập huấn cán bộ</h2>
            <div class="space-y-4">
              <div class="p-3 border-l-4 border-brand-500 bg-brand-50 rounded-r-xl">
                <p class="text-xs font-bold text-brand-700">Sắp diễn ra</p>
                <p class="text-sm font-medium text-slate-900">Kỹ năng nhận diện trầm cảm học đường</p>
                <p class="text-[10px] text-slate-500">14:00, 10/03/2026 • Hội trường A</p>
              </div>
              <div class="p-3 border-l-4 border-slate-300 bg-slate-50 rounded-r-xl opacity-60">
                <p class="text-xs font-bold text-slate-500">Đã kết thúc</p>
                <p class="text-sm font-medium text-slate-900">Quy trình xử lý ngộ độc thực phẩm</p>
                <p class="text-[10px] text-slate-500">25/02/2026 • Trực tuyến</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class EducationComponent {
  healthService = inject(HealthService);
}
