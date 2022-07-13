import { io } from "socket.io-client";

const MAX_RECONNECTION_ATTEMP = 20,
  TIMEOUT = 20000;

class Socket {
  static _instance: Socket | null;

  private createNewSocket() {
    // const url = "https://za-chat-be.onrender.com";
    const url = "http://localhost:5000";
    this.socket = io(url, {
      autoConnect: true,
      reconnection: true,
      timeout: TIMEOUT,
    });

    this.socket.on("disconnect", (reason: string) => {
      if (reason === "io client disconnect") {
        //the reason behind this disconnection is from client kick out
        return;
      } else {
        console.log(reason);
      }
    });

    this.socket.on("connect_fail", () => {
      console.log("Socket connect fail");
    });

    this.socket.on("connect", () => {
      // console.log("Socket establish", this.socket);
      this._connectSuccessCB.forEach((cb: Function) => cb());
    });
  }

  constructor(){ 
    this.createNewSocket();
  }

  public static getInstance(): Socket {
    if (!this._instance) this._instance = new Socket();
    return this._instance;
  }
  private socket: any;

  private _connectSuccessCB: Function[] = [];
  registerConnectSuccess(callback: () => void) {
    this._connectSuccessCB.push(callback);
  }

  private _connectErrorCB: Function[] = [];
  registerConnectError(cb: (error: Error) => void) {
    this._connectErrorCB.push(cb);
  }

  private _reconnectFail: Function | undefined;
  reconnectFailed = (cb: Function) => {
    this._reconnectFail = cb;
  };

  isConnected = () => {
    return this.socket.connected;
  };

  emit = <T>(eventName: string, data: T, ack? : Function) => {
    this.socket.emit(eventName, data,ack);
  };

  registerListener<T>(eventName: string, callback: (data: T) => void) {
    this.socket.on(eventName, callback);
  }

  removeRegisteredListener(eventName: string) {
    this.socket.removeAllListeners(eventName);
  }

  disconnect() {
    console.log("Client disconnect");
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket.close();

    this._connectErrorCB = [];
    this._connectSuccessCB = [];

    console.log(this.socket);
  }
}
export default Socket;
