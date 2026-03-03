import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './health.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nutrition',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl text-slate-900">Dinh dưỡng & An toàn thực phẩm</h1>
        <p class="text-slate-500">Quản lý thực đơn và giám sát vệ sinh bếp ăn</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Weekly Menu -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4 flex items-center gap-2">
              <mat-icon class="text-brand-600">restaurant_menu</mat-icon>
              Thực đơn tuần này
            </h2>
            <div class="space-y-4">
              @for (meal of healthService.meals(); track meal.id) {
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex-1">
                    <p class="font-bold text-slate-900">{{ meal.day }}</p>
                    <p class="text-sm text-slate-600">{{ meal.menu }}</p>
                    <div class="flex gap-4 mt-2">
                      <span class="text-xs text-slate-400 flex items-center gap-1">
                        <mat-icon class="text-xs">bolt</mat-icon> {{ meal.calories }} kcal
                      </span>
                      <span class="text-xs font-medium" [class.text-green-600]="meal.status === 'Đã kiểm định'" [class.text-amber-600]="meal.status === 'Chờ kiểm định'">
                        {{ meal.status }}
                      </span>
                    </div>
                  </div>
                  <button class="btn-secondary text-xs">Chi tiết</button>
                </div>
              }
            </div>
          </div>

          <!-- Food Safety Checklist -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4 flex items-center gap-2">
              <mat-icon class="text-brand-600">fact_check</mat-icon>
              Kiểm tra ATTP định kỳ (Quy trình 3 bước)
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p class="text-xs font-bold text-blue-700 uppercase mb-2">Bước 1: Nhập kho</p>
                <p class="text-sm text-slate-600">Kiểm tra nguồn gốc, độ tươi sống và hạn sử dụng thực phẩm.</p>
              </div>
              <div class="p-4 bg-green-50 rounded-xl border border-green-100">
                <p class="text-xs font-bold text-green-700 uppercase mb-2">Bước 2: Chế biến</p>
                <p class="text-sm text-slate-600">Giám sát quy trình nấu nướng, vệ sinh dụng cụ và nhân viên.</p>
              </div>
              <div class="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p class="text-xs font-bold text-amber-700 uppercase mb-2">Bước 3: Lưu mẫu</p>
                <p class="text-sm text-slate-600">Thực hiện lưu mẫu thức ăn 24h theo quy định của Bộ Y tế.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Nutrition Stats -->
          <div class="glass-card p-6">
            <h2 class="text-xl mb-4">Chỉ số Dinh dưỡng</h2>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span>Cân nặng trung bình</span>
                  <span class="text-brand-600 font-bold">+2% so với tháng trước</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-brand-500 h-full" style="width: 65%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span>Tỷ lệ suy dinh dưỡng</span>
                  <span class="text-green-600 font-bold">-0.5%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-green-500 h-full" style="width: 12%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span>Tỷ lệ béo phì</span>
                  <span class="text-amber-600 font-bold">Ổn định</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-amber-500 h-full" style="width: 8%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6 bg-slate-900 text-white">
            <h2 class="text-lg mb-2">Lưu ý Dinh dưỡng</h2>
            <p class="text-sm text-slate-400 italic">"Đảm bảo thực đơn thay đổi theo mùa và phù hợp với đặc thù phát triển của từng cấp học."</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class NutritionComponent {
  healthService = inject(HealthService);
}
