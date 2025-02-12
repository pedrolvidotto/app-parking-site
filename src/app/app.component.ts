import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy_user';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent,
    UserComponent,
    BluetoothComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app-parking';
  users = DUMMY_USERS;
  selectedUserId: number | string = 1;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }
  onSelectUser(id: number | string) {
    this.selectedUserId = id;
  }

  printers: Bluetooth.BluetoothDevice[] = []; // Array para armazenar impressoras encontradas
  errorMessage: string | null = null; // Variável para armazenar mensagens de erro

  async listBluetoothPrinters() {
    this.errorMessage = null; // Limpa a mensagem de erro antes de tentar listar impressoras
    try {
      // Verifica se a API Bluetooth está disponível
      if ('bluetooth' in navigator) {
        // Solicita ao usuário que selecione dispositivos Bluetooth
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['printer_service'] }], // Substitua pelo UUID correto
        });

        // Adiciona o dispositivo selecionado à lista de impressoras
        this.printers.push(device);

        console.log('Impressora Bluetooth encontrada:', device.name);
      } else {
        this.errorMessage = 'Bluetooth não é suportado neste dispositivo.';
      }
    } catch (error: any) {
      this.errorMessage = `Erro ao listar impressoras Bluetooth: ${error?.message}`;
    }
  }

  ngOnInit() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registrado com sucesso:', registration);

            // Verifica se há uma nova versão do Service Worker
            registration.onupdatefound = () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.onstatechange = () => {
                  if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      // Nova versão disponível
                      console.log('Nova versão disponível. Atualize a página.');
                      // Aqui você pode notificar o usuário ou atualizar automaticamente
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.error('Falha ao registrar o Service Worker:', error);
          });
      });
    }
  }
}
