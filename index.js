var NATS = require('nats');

/**
 * Class representing the Engine Interface.
 * @example
 * const Engine = require('space-engine-node');
 * const engine = new Engine('my-engine');
 * 
 * // Register function with engine
 * engine.registerFunc('my-func', (params, cb) => {
 * console.log('Params:', params)
 * // Do something
 * 
 * const response = { ack: true, message: 'Function as a Service is Awesome!' }
 * cb(response)
 * })
 * 
 */
class Engine {
  /**
   * Create an instance of the Engine API.
   * @param {string} engineName - Name of the engine.
   * @param {string | Object} opts - Connection options for Nats.
   */
  constructor(engineName, opts) {
    this.engine = engineName
    this.callbacks = {}
    if (opts) {
      this.nats = NATS.connect(opts)
    } else {
      this.nats = NATS.connect()
    }
  }

  /** 
   * Callback to be called before returning from function.
   *  @name Callback
   *  @function
   *  @param {Object} res Response to be given back to the client.
   */

  /** 
   * Callback for realtime updates to the subscribed data 
   *  @name EngineFunction
   *  @function
   *  @param {Object} params Params received by function.
   *  @param {Callback} cb The callback function.
   */

  /**
   * Register the function to FaaS Engine
   * @param {string} name - Name of the function.
   * @param {EngineFunction} func - Function to be registered
   * @param {boolean} [authenticate = false] - Check authentication. If true, the function will only be called when the request is authenticated
   */
  registerFunc(name, func, authenticate) {
    const subject = `faas:${this.engine}:${name}`
    if (this.callbacks[subject]) {
      return
    }
    this.callbacks[subject] = func
    this.nats.subscribe(subject, (req, replyTo) => {
      req = JSON.parse(req)
      if (!authenticate || (authenticate && req.token)) {
        this.callbacks[subject](req.params, (res) => {
          if (res === undefined) res = {}
          this.nats.publish(replyTo, JSON.stringify(res))
        })
        return
      }
      this.nats.publish(replyTo, JSON.stringify({ ack: false, err: 'Unauthenticated' }))
    })
  }
}

module.exports = Engine