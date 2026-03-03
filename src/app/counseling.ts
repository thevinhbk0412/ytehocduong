import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './health.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-counseling',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl text-slate-900">Tư vấn tâm lý học đường</h1>
        <p class="text-slate-500">Hỗ trợ sức khỏe tinh thần và giải tỏa áp lực cho học sinh</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Appointment List -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4 flex items-center gap-2">
              <mat-icon class="text-brand-600">calendar_month</mat-icon>
              Lịch hẹn tư vấn
            </h2>
            <div class="space-y-4">
              @for (session of healthService.counselingSessions(); track session.id) {
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                      {{ session.studentName.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">{{ session.studentName }}</p>
                      <p class="text-xs text-slate-500">{{ session.date }} lúc {{ session.time }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs px-2 py-1 rounded-full font-medium" 
                      [class.bg-blue-100]="session.status === 'Đã hẹn'" 
                      [class.text-blue-700]="session.status === 'Đã hẹn'"
                      [class.bg-amber-100]="session.status === 'Chờ xác nhận'"
                      [class.text-amber-700]="session.status === 'Chờ xác nhận'"
                    >
                      {{ session.status }}
                    </span>
                    <p class="text-[10px] text-slate-400 mt-1 italic">{{ session.reason }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Counseling Resources -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4">Tài liệu & Kỹ năng hỗ trợ</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 mb-2">
                  <mat-icon class="text-brand-500">self_improvement</mat-icon>
                  <p class="font-bold text-slate-900">Quản lý Stress</p>
                </div>
                <p class="text-sm text-slate-600">Các bài tập thở và kỹ năng cân bằng cảm xúc cho học sinh cuối cấp.</p>
              </div>
              <div class="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 mb-2">
                  <mat-icon class="text-brand-500">forum</mat-icon>
                  <p class="font-bold text-slate-900">Kỹ năng lắng nghe</p>
                </div>
                <p class="text-sm text-slate-600">Hướng dẫn dành cho giáo viên và phụ huynh khi tiếp cận trẻ.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Counseling Stats -->
          <div class="glass-card p-6 bg-brand-600 text-white">
            <h2 class="text-xl mb-4">Thống kê tháng</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-white/10 rounded-xl">
                <p class="text-2xl font-bold">12</p>
                <p class="text-[10px] uppercase tracking-wider opacity-80">Ca tư vấn</p>
              </div>
              <div class="text-center p-3 bg-white/10 rounded-xl">
                <p class="text-2xl font-bold">85%</p>
                <p class="text-[10px] uppercase tracking-wider opacity-80">Hài lòng</p>
              </div>
            </div>
          </div>

          <!-- AI Counseling Assistant -->
          <div class="glass-card p-6">
            <h2 class="text-lg mb-2 flex items-center gap-2">
              <mat-icon class="text-brand-600">auto_awesome</mat-icon>
              Gợi ý từ AI
            </h2>
            <p class="text-xs text-slate-500 mb-4">Phân tích xu hướng tâm lý học đường dựa trên dữ liệu ẩn danh.</p>
            <div class="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic">
              "Gần đây có sự gia tăng nhẹ về mức độ lo âu ở khối 9 và 12. Khuyến nghị tổ chức thêm các buổi workshop về quản lý thời gian."
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class CounselingComponent {
  healthService = inject(HealthService);
}
