import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService, SchoolLevel } from './health.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl text-slate-900">Tổng quan Y tế</h1>
          <p class="text-slate-500">Chào mừng bạn đến với hệ thống quản lý EduHealth</p>
        </div>
        
        <div class="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          @for (level of levels; track level) {
            <button 
              (click)="healthService.currentLevel.set(level)"
              [class.bg-brand-600]="healthService.currentLevel() === level"
              [class.text-white]="healthService.currentLevel() === level"
              [class.bg-transparent]="healthService.currentLevel() !== level"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            >
              {{ level }}
            </button>
          }
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="glass-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <mat-icon>people</mat-icon>
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Tổng học sinh</p>
            <p class="text-2xl font-bold">{{ currentStudents().length }}</p>
          </div>
        </div>
        
        <div class="glass-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Khỏe mạnh</p>
            <p class="text-2xl font-bold">{{ getCountByStatus('Khỏe mạnh') }}</p>
          </div>
        </div>

        <div class="glass-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <mat-icon>warning</mat-icon>
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Cần theo dõi</p>
            <p class="text-2xl font-bold">{{ getCountByStatus('Cần theo dõi') }}</p>
          </div>
        </div>

        <div class="glass-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <mat-icon>error</mat-icon>
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Đang bệnh</p>
            <p class="text-2xl font-bold">{{ getCountByStatus('Bệnh') }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Student List -->
        <div class="lg:col-span-2 glass-card overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-xl">Danh sách học sinh ({{ healthService.currentLevel() }})</h2>
            <button class="btn-secondary text-sm">
              <mat-icon class="text-sm">add</mat-icon> Thêm mới
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th class="px-6 py-4 font-semibold">Tên học sinh</th>
                  <th class="px-6 py-4 font-semibold">Lớp</th>
                  <th class="px-6 py-4 font-semibold">Chiều cao/Cân nặng</th>
                  <th class="px-6 py-4 font-semibold">Trạng thái</th>
                  <th class="px-6 py-4 font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (student of currentStudents(); track student.id) {
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {{ student.name.charAt(0) }}
                        </div>
                        <div>
                          <p class="font-medium text-slate-900">{{ student.name }}</p>
                          <p class="text-xs text-slate-500">ID: {{ student.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600">{{ student.grade }}</td>
                    <td class="px-6 py-4 text-sm text-slate-600">
                      {{ student.height }}cm / {{ student.weight }}kg
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        [class.bg-green-100]="student.status === 'Khỏe mạnh'"
                        [class.text-green-700]="student.status === 'Khỏe mạnh'"
                        [class.bg-amber-100]="student.status === 'Cần theo dõi'"
                        [class.text-amber-700]="student.status === 'Cần theo dõi'"
                        [class.bg-red-100]="student.status === 'Bệnh'"
                        [class.text-red-700]="student.status === 'Bệnh'"
                        class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                      >
                        {{ student.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-slate-400 hover:text-brand-600 transition-colors">
                        <mat-icon>visibility</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
                @if (currentStudents().length === 0) {
                  <tr>
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">
                      Chưa có dữ liệu học sinh cho cấp học này.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Level Specific Focus -->
        <div class="space-y-6">
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4 flex items-center gap-2">
              <mat-icon class="text-brand-600">priority_high</mat-icon>
              Trọng tâm {{ healthService.currentLevel() }}
            </h2>
            <ul class="space-y-3">
              @for (point of getFocusPoints(); track point) {
                <li class="flex items-start gap-3 text-sm text-slate-600">
                  <mat-icon class="text-brand-500 text-lg mt-0.5">check_circle</mat-icon>
                  {{ point }}
                </li>
              }
            </ul>
          </div>

          <div class="glass-card p-6 bg-brand-50 border-brand-100">
            <h2 class="text-xl mb-2 flex items-center gap-2">
              <mat-icon class="text-brand-600">psychology</mat-icon>
              Trợ lý AI Y tế
            </h2>
            <p class="text-sm text-slate-600 mb-4">Hỏi AI về các vấn đề sức khỏe học đường.</p>
            <div class="space-y-2">
              <input 
                #aiInput
                (keyup.enter)="askAI(aiInput.value); aiInput.value = ''"
                type="text" 
                placeholder="Ví dụ: Cách phòng chống cận thị..."
                class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
              <button 
                (click)="askAI(aiInput.value); aiInput.value = ''"
                class="w-full btn-primary justify-center"
              >
                Hỏi AI
              </button>
            </div>
            
            @if (aiLoading()) {
              <div class="mt-4 flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-600"></div>
              </div>
            } @else if (aiResponse()) {
              <div class="mt-4 p-4 bg-white rounded-xl border border-brand-100 text-sm text-slate-700 max-h-48 overflow-y-auto">
                {{ aiResponse() }}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DashboardComponent {
  healthService = inject(HealthService);
  levels = Object.values(SchoolLevel);
  
  aiResponse = signal<string | null>(null);
  aiLoading = signal(false);

  currentStudents = () => this.healthService.getStudentsByLevel(this.healthService.currentLevel());

  getCountByStatus(status: string) {
    return this.currentStudents().filter(s => s.status === status).length;
  }

  getFocusPoints() {
    const level = this.healthService.currentLevel();
    switch (level) {
      case SchoolLevel.PRESCHOOL:
        return [
          'Theo dõi biểu đồ tăng trưởng hàng tháng',
          'Giám sát quy trình 3 bước tại bếp ăn',
          'Hình thành thói quen vệ sinh (rửa tay)',
          'Đảm bảo môi trường đồ chơi an toàn'
        ];
      case SchoolLevel.PRIMARY:
        return [
          'Sàng lọc cận thị, cong vẹo cột sống',
          'Chương trình Nha học đường định kỳ',
          'Giám sát vệ sinh công trình nước sạch',
          'Phát hiện sớm các dấu hiệu tâm lý (bắt nạt)'
        ];
      case SchoolLevel.SECONDARY:
        return [
          'Tư vấn sức khỏe tâm sinh lý tuổi dậy thì',
          'Phòng chống tác hại thuốc lá, ma túy',
          'An toàn không gian mạng (cyber safety)',
          'Thiết lập phòng tư vấn tâm lý học đường'
        ];
      case SchoolLevel.HIGH_SCHOOL:
        return [
          'Tư vấn sức khỏe sinh sản chuyên sâu',
          'Kỹ năng quản lý căng thẳng (stress)',
          'Định hướng nghề nghiệp theo sức khỏe',
          'Câu lạc bộ & Ngày hội sức khỏe học sinh'
        ];
      default:
        return [];
    }
  }

  async askAI(query: string) {
    if (!query.trim()) return;
    this.aiLoading.set(true);
    this.aiResponse.set(null);
    const response = await this.healthService.getHealthAdvice(query);
    this.aiResponse.set(response || 'Không có phản hồi từ AI.');
    this.aiLoading.set(false);
  }
}
