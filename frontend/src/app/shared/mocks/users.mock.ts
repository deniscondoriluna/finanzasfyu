export interface MockUser {
  id:       number;
  name:     string;
  email:    string;
  password: string;
  role:     string;
  service?: string; // solo para operadores
}

export const USERS_MOCK: MockUser[] = [
  {
    id:       1,
    name:     'Administrador NYU',
    email:    'admin@nyu.edu',
    password: 'Admin1234',
    role:     'ADMIN'
  },
  {
    id:       2,
    name:     'Operador Matrícula',
    email:    'matricula@nyu.edu',
    password: 'Op1234',
    role:     'OPERATOR',
    service:  'MATRICULA'
  },
  {
    id:       3,
    name:     'Operador Biblioteca',
    email:    'biblioteca@nyu.edu',
    password: 'Op1234',
    role:     'OPERATOR',
    service:  'BIBLIOTECA'
  }
];