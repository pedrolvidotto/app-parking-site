self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/assets/logo.svg",
        // Adicione outros arquivos que você deseja armazenar em cache
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["v1"]; // Atualize para a nova versão do cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Remove caches antigos
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.error("Falha ao registrar o Service Worker:", error);
      });
  });
}

// Função para conectar a uma impressora via Bluetooth
async function connectToBluetoothPrinter() {
  try {
    // Solicita ao usuário que selecione um dispositivo Bluetooth
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ["printer_service"] }], // Substitua por um serviço específico da impressora
    });

    // Conecta ao dispositivo selecionado
    const server = await device.gatt.connect();

    // Obtém o serviço desejado (substitua pelo serviço correto da impressora)
    const service = await server.getPrimaryService("printer_service");

    // Obtém a característica desejada (substitua pela característica correta)
    const characteristic = await service.getCharacteristic(
      "print_characteristic"
    );

    // Exemplo: Enviar dados para a impressora
    const data = new Uint8Array([
      /* dados a serem impressos */
    ]);
    await characteristic.writeValue(data);
    console.log("Dados enviados para a impressora com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar à impressora Bluetooth:", error);
  }
}

// Chame a função para iniciar a conexão
connectToBluetoothPrinter();
