/* eslint-disable @typescript-eslint/no-explicit-any */
type IBus = {
  publish: (eventName: string, ...args: any[]) => void
  subscribe: (eventName: string, callback: ICallback) => void
}

type ICallback = (...args: any[]) => void
type IEventName2callbacks = Map<string, ICallback[]>

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

  trySubscribe(eventName: string, cb: ICallback): void {
    if (this.eventName2callbacks.has(eventName)) {
      return
    }
    this.subscribe(eventName, cb)
  }
}

export default new Bus()
