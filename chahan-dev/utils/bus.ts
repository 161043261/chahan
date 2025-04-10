/* eslint-disable @typescript-eslint/no-explicit-any */
interface IBus {
  publish: (eventName: string, ...args: any[]) => void
  subscribe: (eventName: string, callback: TCallback) => void
}

type TCallback = (...args: any[]) => void
type TEventName2callbacks = Map<string, TCallback[]>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Bus implements IBus {
  constructor(private eventName2callbacks: TEventName2callbacks = new Map<string, TCallback[]>()) {}

  publish(eventName: string, ...args: any[]): void {
    const callbacks = this.eventName2callbacks.get(eventName)
    if (callbacks) {
      callbacks.forEach((cb) => cb.apply(this, args))
    }
  }

  subscribe(eventName: string, cb: TCallback): void {
    const callbacks = this.eventName2callbacks.get(eventName) ?? []
    callbacks.push(cb)
    this.eventName2callbacks.set(eventName, callbacks)
  }
}

// export const bus2 = new Bus()

class Bus2 implements IBus {
  static #instance: Bus2

  private constructor(
    private eventName2callbacks: TEventName2callbacks = new Map<string, TCallback[]>(),
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

  subscribe(eventName: string, cb: TCallback): void {
    const callbacks = this.eventName2callbacks.get(eventName) ?? []
    callbacks.push(cb)
    this.eventName2callbacks.set(eventName, callbacks)
  }
}

export default Bus2.instance
