/* eslint-disable @typescript-eslint/no-explicit-any */
type IBus = {
  publish: (eventName: string, ...args: any[]) => void
  subscribe: (eventName: string, callback: ICallback) => void
}

type ICallback = (...args: any[]) => void
type IEventName2callbacks = Map<string, ICallback[]>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Bus implements IBus {
  constructor(private eventName2callbacks: IEventName2callbacks = new Map<string, ICallback[]>()) {}

  publish(eventName: string, ...args: any[]): void {
    const callbacks = this.eventName2callbacks.get(eventName)
    if (callbacks) {
      callbacks.forEach((cb) => cb.apply(this, args))
    }
  }

  subscribe(eventName: string, cb: ICallback): void {
    const callbacks = this.eventName2callbacks.get(eventName) ?? []
    callbacks.push(cb)
    this.eventName2callbacks.set(eventName, callbacks)
  }
}

// export const bus2 = new Bus()

class Bus2 implements IBus {
  static #instance: Bus2

  private constructor(
    private eventName2callbacks: IEventName2callbacks = new Map<string, ICallback[]>(),
  ) {}
  public static get instance(): Bus2 {
    if (!Bus2.#instance) {
      Bus2.#instance = new Bus2()
    }
    return Bus2.#instance
  }

  publish(eventName: string, ...args: any[]): void {
    const callbacks = this.eventName2callbacks.get(eventName)
    if (callbacks) {
      callbacks.forEach((cb) => cb.apply(this, args))
    }
  }

  subscribe(eventName: string, cb: ICallback): void {
    const callbacks = this.eventName2callbacks.get(eventName) ?? []
    callbacks.push(cb)
    this.eventName2callbacks.set(eventName, callbacks)
  }
}

export default Bus2.instance
