import { Course, Material } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 1,
    name: 'Álgebra',
    description: 'Explora los fundamentos del álgebra, desde expresiones hasta sistemas de ecuaciones complejos.',
    topics: [
      { id: 0, name: 'Semana 1: Expresiones algebraicas' },
      { id: 1, name: 'Semana 2: Ecuaciones lineales' },
      { id: 2, name: 'Semana 3: Factorización' },
      { id: 3, name: 'Semana 4: Sistemas de ecuaciones' },
    ],
  },
  {
    id: 2,
    name: 'Aritmética',
    description: 'Domina las operaciones básicas, fracciones, proporciones y potencias para construir una base matemática sólida.',
    topics: [
      { id: 0, name: 'Semana 1: Números naturales y enteros' },
      { id: 1, name: 'Semana 2: Fracciones y decimales' },
      { id: 2, name: 'Semana 3: Proporciones y porcentajes' },
      { id: 3, name: 'Semana 4: Potencias y raíces' },
    ],
  },
  {
    id: 3,
    name: 'Física',
    description: 'Descubre los principios del movimiento, las fuerzas y la energía que rigen el universo físico.',
    topics: [
      { id: 0, name: 'Semana 1: Magnitudes y unidades' },
      { id: 1, name: 'Semana 2: Movimiento rectilíneo' },
      { id: 2, name: 'Semana 3: Fuerzas y leyes de Newton' },
      { id: 3, name: 'Semana 4: Energía y trabajo' },
    ],
  },
];

export const MATERIALS_DATA: Material[] = [
  // Álgebra
  { id: 101, courseId: 1, title: 'Guía Completa de Álgebra', description: 'Un PDF detallado cubriendo todos los temas del curso.', type: 'PDF', url: '#' },
  { id: 102, courseId: 1, title: 'Ejercicios Resueltos de Factorización', description: 'Practica con más de 100 ejercicios de factorización.', type: 'PDF', url: '#' },
  { id: 103, courseId: 1, title: 'Introducción a las Ecuaciones', description: 'Un video explicativo sobre los fundamentos de las ecuaciones lineales.', type: 'Video', url: '#' },

  // Aritmética
  { id: 201, courseId: 2, title: 'Fundamentos de Aritmética Moderna', description: 'El libro de texto oficial del curso.', type: 'Libro', url: '#' },
  { id: 202, courseId: 2, title: 'Manual de Proporciones y Porcentajes', description: 'Aprende a aplicar proporciones en la vida real.', type: 'PDF', url: '#' },

  // Física
  { id: 301, courseId: 3, title: 'Mecánica Clásica para Principiantes', description: 'Desde las leyes de Newton hasta la conservación de la energía.', type: 'Libro', url: '#' },
  { id: 302, courseId: 3, title: 'Formulario de Magnitudes y Unidades', description: 'Un práctico PDF con todas las fórmulas y conversiones que necesitas.', type: 'PDF', url: '#' },
];
