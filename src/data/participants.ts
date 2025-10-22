import { Participant } from '../types';

<<<<<<< HEAD
export const participantes: Participant[] = [
  { id: 'par-001', nombre: 'Ana García' },
=======
function generarClave() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let clave = '';
  for (let i = 0; i < 6; i++) {
    clave += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return clave;
}

export const participantes: Participant[] = [
  { id: 'par-001', nombre: 'Ana García',  },
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
  { id: 'par-002', nombre: 'Luis Pérez' },
  { id: 'par-003', nombre: 'María López' },
  { id: 'par-004', nombre: 'Jorge Hernández' },
  { id: 'par-005', nombre: 'Sofía Díaz' },
  { id: 'par-006', nombre: 'Carlos Ruiz' },
  { id: 'par-007', nombre: 'Elena Torres' },
  { id: 'par-008', nombre: 'Diego Sánchez' },
  { id: 'par-009', nombre: 'Paula Romero' },
  { id: 'par-010', nombre: 'Fernando Ortiz' },
];


