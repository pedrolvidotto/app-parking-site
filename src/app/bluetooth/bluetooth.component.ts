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
      const device = await navigator.bluetooth.requestDevice();

      this.devices.push(device);
      console.log('Dispositivo Bluetooth conectado:', device.name);
    } catch (error: any) {
      this.errorMessage = `Erro ao conectar ao dispositivo Bluetooth: ${error.message}`;
    }
  }

  async printTestPage() {
    this.errorMessage = null; // Limpa a mensagem de erro
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['00001101-0000-1000-8000-00805f9b34fb'] }], // Substitua pelo UUID correto da impressora
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        '00001101-0000-1000-8000-00805f9b34fb'
      ); // Substitua pelo UUID correto
      const characteristic = await service.getCharacteristic(
        '00001102-0000-1000-8000-00805f9b34fb'
      ); // Substitua pela característica correta

      // Dados de teste para impressão
      const data = new Uint8Array([
        /* dados a serem impressos */
      ]);
      await characteristic.writeValue(data);
      console.log('Dados enviados para a impressora com sucesso.');
    } catch (error: any) {
      this.errorMessage = `Erro ao enviar dados para a impressora: ${error.message}`;
    }
  }
}
