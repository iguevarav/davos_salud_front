export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "staff";
  avatar?: string;
  lastLogin?: Date;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  medicalHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  role: "doctor" | "nurse" | "administrative";
  hireDate: Date;
  status: "active" | "inactive";
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  section?: string;
}

export interface StatCard {
  title: string;
  value: number | string;
  description: string;
  trend: string;
  icon: string;
  trendPositive?: boolean;
}

export interface ActivityItem {
  icon: string;
  name: string;
  description?: string;
  time: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  medications: Medication[];
  diagnosis: string;
  instructions: string;
  date: Date;
  status: "active" | "completed" | "cancelled";
  followUpDate?: Date;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface PrescriptionFilters {
  status?: string;
  patient?: string;
  doctor?: string;
  dateRange?: string;
}