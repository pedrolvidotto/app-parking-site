interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export const DUMMY_USERS: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: 'user-1.jpg',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    avatar: 'user-2.jpg',
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    avatar: 'user-3.jpg',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana@email.com',
    avatar: 'user-4.jpg',
  },
];
