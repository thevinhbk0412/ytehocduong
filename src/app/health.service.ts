import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

export enum SchoolLevel {
  PRESCHOOL = 'Mầm non',
  PRIMARY = 'Tiểu học',
  SECONDARY = 'THCS',
  HIGH_SCHOOL = 'THPT'
}

export interface Student {
  id: string;
  name: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  level: SchoolLevel;
  grade: string;
  height: number; // cm
  weight: number; // kg
  bloodType?: string;
  allergies?: string[];
  lastCheckup?: string;
  status: 'Khỏe mạnh' | 'Cần theo dõi' | 'Bệnh';
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
  currentLevel = signal<SchoolLevel>(SchoolLevel.PRIMARY);
  
  students = signal<Student[]>([
    { id: '1', name: 'Nguyễn Văn An', dob: '2018-05-12', gender: 'Nam', level: SchoolLevel.PRIMARY, grade: '1A', height: 120, weight: 22, status: 'Khỏe mạnh', lastCheckup: '2025-12-10' },
    { id: '2', name: 'Trần Thị Bình', dob: '2018-08-20', gender: 'Nữ', level: SchoolLevel.PRIMARY, grade: '1A', height: 118, weight: 20, status: 'Cần theo dõi', lastCheckup: '2025-12-11' },
    { id: '3', name: 'Lê Hoàng Long', dob: '2021-03-15', gender: 'Nam', level: SchoolLevel.PRESCHOOL, grade: 'Chồi 2', height: 95, weight: 14, status: 'Khỏe mạnh', lastCheckup: '2026-01-05' },
    { id: '4', name: 'Phạm Minh Đức', dob: '2010-11-02', gender: 'Nam', level: SchoolLevel.SECONDARY, grade: '8B', height: 165, weight: 55, status: 'Bệnh', lastCheckup: '2026-02-15' },
    { id: '5', name: 'Hoàng Thùy Linh', dob: '2008-04-25', gender: 'Nữ', level: SchoolLevel.HIGH_SCHOOL, grade: '11C', height: 162, weight: 48, status: 'Khỏe mạnh', lastCheckup: '2026-01-20' },
  ]);

  meals = signal([
    { id: 1, day: 'Thứ Hai', menu: 'Cơm trắng, Thịt kho trứng, Canh bí đỏ, Chuối', calories: 650, status: 'Đã kiểm định' },
    { id: 2, day: 'Thứ Ba', menu: 'Phở bò, Sữa tươi, Táo', calories: 580, status: 'Đã kiểm định' },
    { id: 3, day: 'Thứ Tư', menu: 'Cơm gà Hải Nam, Canh cải, Dưa hấu', calories: 700, status: 'Chờ kiểm định' },
  ]);

  counselingSessions = signal([
    { id: 1, studentName: 'Phạm Minh Đức', date: '2026-03-05', time: '09:00', reason: 'Áp lực học tập', status: 'Đã hẹn' },
    { id: 2, studentName: 'Trần Thị Bình', date: '2026-03-06', time: '14:30', reason: 'Vấn đề bạn bè', status: 'Chờ xác nhận' },
  ]);

  campaigns = signal([
    { id: 1, name: 'Chiến dịch Rửa tay sạch khuẩn', date: '2026-03-15', target: 'Toàn trường', status: 'Đang chuẩn bị' },
    { id: 2, name: 'Nha học đường 2026', date: '2026-04-10', target: 'Tiểu học', status: 'Lên kế hoạch' },
  ]);

  async getHealthAdvice(prompt: string) {
    try {
      const model = this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là một chuyên gia y tế học đường tại Việt Nam. Hãy trả lời câu hỏi sau một cách chuyên nghiệp, dễ hiểu và phù hợp với môi trường giáo dục: ${prompt}`,
      });
      const response = await model;
      return response.text;
    } catch (error) {
      console.error('AI Error:', error);
      return 'Xin lỗi, tôi không thể kết nối với trí tuệ nhân tạo lúc này. Vui lòng thử lại sau.';
    }
  }

  getStudentsByLevel(level: SchoolLevel) {
    return this.students().filter(s => s.level === level);
  }
}
