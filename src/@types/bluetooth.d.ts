declare namespace Bluetooth {
  interface BluetoothDevice {
    name: string | null;
    id: string;
    gatt: {
      connect: () => Promise<any>;
    };
    uuids: string[];
  }

  interface Bluetooth {
    requestDevice(options?: {
      filters?: Array<{ services: string[] }>;
      optionalServices?: string[];
    }): Promise<BluetoothDevice>;
    getDevices(): Promise<BluetoothDevice[]>;
  }
}

interface Navigator {
  bluetooth: Bluetooth.Bluetooth;
  bluetoothDevice: Bluetooth.BluetoothDevice;
}
