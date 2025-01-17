const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export class GameWebSocket {
  private ws: WebSocket | null = null;
  private messageHandlers: Map<string, (payload: any) => void> = new Map();

  connect() {
    this.ws = new WebSocket(WS_URL);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const handler = this.messageHandlers.get(data.type);
      if (handler) {
        handler(data.payload);
      }
    };

    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.onopen = resolve;
      }
    });
  }

  on(type: string, handler: (payload: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const gameWs = new GameWebSocket();