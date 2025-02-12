import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bluetooth',
  imports: [CommonModule],
  templateUrl: './bluetooth.component.html',
  styleUrl: './bluetooth.component.scss',
})
export class BluetoothComponent {
  devices: Bluetooth.BluetoothDevice[] = [];
  errorMessage: string | null = null;

  async connectToBluetoothDevice() {
    this.errorMessage = null; // Limpa a mensagem de erro
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['print_service'] }], // Substitua pelo UUID do serviço de impressora desejado
      });

      this.devices.push(device);
      console.log('Dispositivo Bluetooth conectado:', device.name);
    } catch (error: any) {
      this.errorMessage = `Erro ao conectar ao dispositivo Bluetooth: ${error.message}`;
    }
  }
}
