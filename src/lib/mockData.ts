import { StatCard, ActivityItem, Patient, Employee, Prescription } from "@/types";

export const statCards: StatCard[] = [
  {
    title: "Citas Hoy",
    value: 28,
    description: "Citas programadas para hoy",
    trend: "12% más que ayer",
    icon: "far fa-calendar-check",
    trendPositive: true,
  },
  {
    title: "Pacientes Activos",
    value: 156,
    description: "Pacientes en tratamiento",
    trend: "8% este mes",
    icon: "far fa-user",
    trendPositive: true,
  },
  {
    title: "Tratamientos Activos",
    value: 42,
    description: "Protocolos en curso",
    trend: "5% esta semana",
    icon: "fas fa-heartbeat",
    trendPositive: true,
  },
  {
    title: "Valoración",
    value: "4.8",
    description: "Puntuación promedio",
    trend: "Excelente",
    icon: "far fa-star",
    trendPositive: true,
  },
];

export const activities = [
  {
    icon: "fas fa-user-plus",
    name: "Nuevo paciente registrado",
    description: "María González",
    time: "Hace 10 minutos",
  },
  {
    icon: "fas fa-check-circle",
    name: "Cita completada",
    description: "Carlos Rodríguez",
    time: "Hace 25 minutos",
  },
  {
    icon: "far fa-calendar",
    name: "Cita agendada",
    description: "Ana Martínez",
    time: "Hace 1 hora",
  },
  {
    icon: "far fa-file-alt",
    name: "Historia clínica actualizada",
    description: "Pedro Sánchez",
    time: "Hace 2 horas",
  },
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+34 612 345 678',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'female',
    medicalHistory: 'Historia de acné moderado. Alergia a penicilina.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+34 623 456 789',
    dateOfBirth: new Date('1978-07-22'),
    gender: 'male',
    medicalHistory: 'Tratamiento para psoriasis. Sin alergias conocidas.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+34 634 567 890',
    dateOfBirth: new Date('1992-11-30'),
    gender: 'female',
    medicalHistory: 'Consulta por melasma. Embarazada - 24 semanas.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@email.com',
    phone: '+34 645 678 901',
    dateOfBirth: new Date('1980-05-14'),
    gender: 'male',
    medicalHistory: 'Cáncer de piel en remisión. Seguimiento trimestral.',
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '5',
    name: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    phone: '+34 656 789 012',
    dateOfBirth: new Date('1995-09-08'),
    gender: 'female',
    medicalHistory: 'Acné quístico. En tratamiento con isotretinoína.',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-05')
  },
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Dra. Rosa López',
    email: 'rosa.lopez@davossalud.com',
    phone: '+34 611 222 333',
    specialty: 'Dermatología Estética',
    role: 'doctor',
    hireDate: new Date('2020-03-15'),
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Carlos Mendez',
    email: 'carlos.mendez@davossalud.com',
    phone: '+34 622 333 444',
    specialty: 'Cirugía Dermatológica',
    role: 'doctor',
    hireDate: new Date('2019-08-22'),
    status: 'active'
  },
  {
    id: '3',
    name: 'Enf. Marta Rodríguez',
    email: 'marta.rodriguez@davossalud.com',
    phone: '+34 633 444 555',
    specialty: 'Enfermería Dermatológica',
    role: 'nurse',
    hireDate: new Date('2021-01-10'),
    status: 'active'
  },
  {
    id: '4',
    name: 'Ana García',
    email: 'ana.garcia@davossalud.com',
    phone: '+34 644 555 666',
    specialty: 'Recepcionista',
    role: 'administrative',
    hireDate: new Date('2022-05-20'),
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. Javier Ruiz',
    email: 'javier.ruiz@davossalud.com',
    phone: '+34 655 666 777',
    specialty: 'Dermatología Pediátrica',
    role: 'doctor',
    hireDate: new Date('2018-11-30'),
    status: 'inactive'
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    patientName: 'María González',
    doctorName: 'Dra. Rosa López',
    diagnosis: 'Acné moderado con inflamación',
    instructions: 'Aplicar crema por la noche después de lavar el rostro. Evitar exposición al sol. Usar protector solar SPF 50+ durante el día.',
    medications: [
      {
        id: '1',
        name: 'Peróxido de benzoílo',
        dosage: '5%',
        frequency: 'Una vez al día',
        duration: '8 semanas',
        instructions: 'Aplicar fina capa en áreas afectadas'
      },
      {
        id: '2',
        name: 'Clindamicina tópica',
        dosage: '1%',
        frequency: 'Dos veces al día',
        duration: '6 semanas',
        instructions: 'Aplicar después del peróxido de benzoílo'
      }
    ],
    date: new Date('2024-02-15'),
    status: 'active',
    followUpDate: new Date('2024-04-15'),
    notes: 'Paciente con piel sensible. Monitorear posible irritación.'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    patientName: 'Carlos Rodríguez',
    doctorName: 'Dr. Carlos Mendez',
    diagnosis: 'Psoriasis en placas moderada',
    instructions: 'Aplicar pomada después del baño. Hidratar piel regularmente. Evitar rascado.',
    medications: [
      {
        id: '1',
        name: 'Betametasona pomada',
        dosage: '0.1%',
        frequency: 'Dos veces al día',
        duration: '4 semanas',
        instructions: 'Aplicar capa delgada en placas'
      },
      {
        id: '2',
        name: 'Emoliente base de urea',
        dosage: '10%',
        frequency: 'Tres veces al día',
        duration: '8 semanas',
        instructions: 'Aplicar en toda la piel después del baño'
      }
    ],
    date: new Date('2024-02-10'),
    status: 'completed',
    notes: 'Buena respuesta al tratamiento inicial.'
  },
];