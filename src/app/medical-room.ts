import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Medicine {
  name: string;
  stock: number;
  expiry: string; // YYYY-MM
}

@Component({
  selector: 'app-medical-room',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl text-slate-900">Phòng Y tế & Thiết bị</h1>
          <p class="text-slate-500">Quản lý cơ sở vật chất và vật tư y tế thiết yếu</p>
        </div>
        <div class="flex gap-2">
          @if (expiredCount() > 0 || nearExpiryCount() > 0) {
            <div class="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-medium animate-pulse">
              <mat-icon>warning</mat-icon>
              Có {{ expiredCount() + nearExpiryCount() }} cảnh báo thuốc
            </div>
          }
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Equipment List -->
        <div class="lg:col-span-2 glass-card p-6">
          <h2 class="text-xl mb-4">Trang thiết bị tối thiểu</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            @for (item of equipment; track item.name) {
              <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-600">
                    <mat-icon>{{ item.icon }}</mat-icon>
                  </div>
                  <div>
                    <p class="font-medium text-slate-900">{{ item.name }}</p>
                    <p class="text-xs text-slate-500">{{ item.status }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold">{{ item.quantity }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Medicine Cabinet -->
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl">Tủ thuốc thiết yếu</h2>
            <span class="text-xs text-slate-400">Cập nhật: {{ lastInventoryDate() }}</span>
          </div>
          
          <div class="space-y-4">
            @for (med of medicines(); track med.name) {
              <div class="p-3 rounded-xl border transition-all" 
                [class.bg-red-50]="isExpired(med.expiry)"
                [class.border-red-200]="isExpired(med.expiry)"
                [class.bg-amber-50]="isNearExpiry(med.expiry) && !isExpired(med.expiry)"
                [class.border-amber-200]="isNearExpiry(med.expiry) && !isExpired(med.expiry)"
                [class.border-slate-100]="!isNearExpiry(med.expiry) && !isExpired(med.expiry)"
              >
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium text-slate-900">{{ med.name }}</p>
                  <span 
                    [class.bg-green-100]="med.stock > 10"
                    [class.text-green-700]="med.stock > 10"
                    [class.bg-red-100]="med.stock <= 10"
                    [class.text-red-700]="med.stock <= 10"
                    class="px-2 py-0.5 rounded text-[10px] font-bold"
                  >
                    Kho: {{ med.stock }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-[10px] uppercase tracking-wider" 
                    [class.text-red-600]="isExpired(med.expiry)"
                    [class.text-amber-600]="isNearExpiry(med.expiry) && !isExpired(med.expiry)"
                    [class.text-slate-500]="!isNearExpiry(med.expiry) && !isExpired(med.expiry)"
                  >
                    HSD: {{ med.expiry }}
                    @if (isExpired(med.expiry)) { (Hết hạn) }
                    @else if (isNearExpiry(med.expiry)) { (Sắp hết hạn) }
                  </p>
                  @if (isExpired(med.expiry) || isNearExpiry(med.expiry)) {
                    <mat-icon class="text-sm" [class.text-red-500]="isExpired(med.expiry)" [class.text-amber-500]="isNearExpiry(med.expiry)">priority_high</mat-icon>
                  }
                </div>
              </div>
            }
          </div>

          <button (click)="performInventory()" class="w-full mt-6 btn-secondary justify-center group">
            <mat-icon class="group-hover:rotate-180 transition-transform duration-500">sync</mat-icon> 
            Thực hiện kiểm kê
          </button>
        </div>
      </div>

      <!-- Facility Standards -->
      <div class="glass-card p-6 bg-slate-900 text-white">
        <h2 class="text-xl mb-4 flex items-center gap-2">
          <mat-icon class="text-brand-400">verified</mat-icon>
          Tiêu chuẩn Phòng Y tế Học đường
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <p class="text-brand-400 font-bold text-sm uppercase">Vị trí</p>
            <p class="text-slate-300 text-sm">Thuận tiện cho việc sơ cứu, sạch sẽ, thoáng mát, đủ ánh sáng.</p>
          </div>
          <div class="space-y-2">
            <p class="text-brand-400 font-bold text-sm uppercase">Diện tích</p>
            <p class="text-slate-300 text-sm">Đảm bảo từ 12m2 trở lên, có khu vực khám và khu vực nghỉ ngơi.</p>
          </div>
          <div class="space-y-2">
            <p class="text-brand-400 font-bold text-sm uppercase">Nhân sự</p>
            <p class="text-slate-300 text-sm">Cán bộ y tế có trình độ từ y sĩ trung cấp trở lên, được đào tạo liên tục.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class MedicalRoomComponent {
  equipment = [
    { name: 'Giường khám', quantity: 2, status: 'Tốt', icon: 'bed' },
    { name: 'Tủ thuốc', quantity: 1, status: 'Tốt', icon: 'medical_services' },
    { name: 'Nhiệt kế điện tử', quantity: 5, status: 'Tốt', icon: 'thermostat' },
    { name: 'Máy đo huyết áp', quantity: 1, status: 'Tốt', icon: 'monitor_heart' },
    { name: 'Cáng cứu thương', quantity: 1, status: 'Tốt', icon: 'emergency' },
    { name: 'Bảng kiểm tra thị lực', quantity: 2, status: 'Tốt', icon: 'visibility' },
  ];

  medicines = signal<Medicine[]>([
    { name: 'Paracetamol 500mg', stock: 50, expiry: '2027-05' },
    { name: 'Nước muối sinh lý', stock: 12, expiry: '2026-04' }, // Sắp hết hạn (Hiện tại 2026-03)
    { name: 'Bông băng gạc', stock: 25, expiry: '2028-01' },
    { name: 'Cồn 70 độ', stock: 5, expiry: '2025-12' }, // Đã hết hạn
    { name: 'Thuốc sát trùng', stock: 8, expiry: '2027-02' },
    { name: 'Oresol', stock: 30, expiry: '2027-09' },
  ]);

  lastInventoryDate = signal<string>(new Date().toLocaleDateString('vi-VN'));

  expiredCount = computed(() => this.medicines().filter(m => this.isExpired(m.expiry)).length);
  nearExpiryCount = computed(() => this.medicines().filter(m => this.isNearExpiry(m.expiry) && !this.isExpired(m.expiry)).length);

  isExpired(expiry: string): boolean {
    const today = new Date('2026-03-03');
    const [year, month] = expiry.split('-').map(Number);
    const expiryDate = new Date(year, month - 1, 1);
    return expiryDate < today;
  }

  isNearExpiry(expiry: string): boolean {
    const today = new Date('2026-03-03');
    const [year, month] = expiry.split('-').map(Number);
    const expiryDate = new Date(year, month - 1, 1);
    
    // Sắp hết hạn nếu còn dưới 3 tháng
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
    return diffMonths >= 0 && diffMonths <= 3;
  }

  performInventory() {
    // Giả lập việc kiểm kê bằng cách cập nhật ngày và có thể thay đổi số lượng ngẫu nhiên
    this.lastInventoryDate.set(new Date().toLocaleDateString('vi-VN'));
    
    this.medicines.update(current => current.map(m => ({
      ...m,
      stock: Math.max(0, m.stock + Math.floor(Math.random() * 5) - 2) // Thay đổi nhẹ số lượng
    })));

    console.log('Đã thực hiện kiểm kê định kỳ.');
  }
}

