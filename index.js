var NATS = require('nats');

/**
 * Class representing the Engine Interface.
 * @example
 * const Engine = require('space-engine-node');
 * const engine = new Engine('my-engine');
 * 
 * // Register function with engine
 * engine.registerFunc('my-func', (params, auth, cb) => {
 * console.log('Params:', params, 'Auth', auth)
 * // Do something
 * 
 * const res = { ack: true, message: 'Function as a Service is Awesome!' }
 * cb('response', res)
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
   *  @param {string} type Type of callback action to be performed.
   *  @param {Object} res Data to be sent to client.
   */

  /** 
   * Callback for realtime updates to the subscribed data 
   *  @name EngineFunction
   *  @function
   *  @param {Object} params Params received by function.
   *  @param {Object} auth Auth object of client. Will be undefined if request is unauthenticated.
   *  @param {Callback} cb The callback function to be called by the function.
   */

  /**
   * Register the function to FaaS Engine
   * @param {string} name - Name of the function.
   * @param {EngineFunction} func - Function to be registered
   */
  registerFunc(name, func) {
    // name of the subject
    const subject = `faas:${this.engine}:${name}`

    // Subscribe to nats subject
    this.nats.subscribe(subject, { 'queue': this.engine }, (req, replyTo) => {
      // Parse the request
      req = JSON.parse(req)

      func(req.params, req.auth, (type, res) => {
        switch (type) {
          case 'response':
            // Give the response back via nats publish
            this.nats.publish(replyTo, JSON.stringify(res))
            break
        }
      })
    })
  }
}

module.exports = Engine