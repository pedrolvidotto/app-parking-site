import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const DUMMY_USERS: User[] = [
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
    avatar: 'avatar3.jpg',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana@email.com',
    avatar: 'user-4.jpg',
  },
];

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  selectedUser = signal(DUMMY_USERS[this.randomIndex]);
  imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]);
  }

  private get randomIndex(): number {
    return Math.floor(Math.random() * DUMMY_USERS.length);
  }
}
