## Classes

<dl>
<dt><a href="#Engine">Engine</a></dt>
<dd><p>Class representing the Engine Interface.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Callback">Callback(res)</a></dt>
<dd><p>Callback to be called before returning from function.</p>
</dd>
<dt><a href="#EngineFunction">EngineFunction(params, cb)</a></dt>
<dd><p>Callback for realtime updates to the subscribed data</p>
</dd>
</dl>

<a name="Engine"></a>

## Engine
Class representing the Engine Interface.

**Kind**: global class  

* [Engine](#Engine)
    * [new Engine(engineName, opts)](#new_Engine_new)
    * [.registerFunc(name, func, [authenticate])](#Engine+registerFunc)

<a name="new_Engine_new"></a>

### new Engine(engineName, opts)
Create an instance of the Engine API.


| Param | Type | Description |
| --- | --- | --- |
| engineName | <code>string</code> | Name of the engine. |
| opts | <code>string</code> \| <code>Object</code> | Connection options for Nats. |

**Example**  
```js
const Engine = require('space-engine-node');
const engine = new Engine('my-engine');

// Register function with engine
engine.registerFunc('my-func', (params, cb) => {
console.log('Params:', params)
// Do something

const response = { ack: true, message: 'Function as a Service is Awesome!' }
cb(response)
})
```
<a name="Engine+registerFunc"></a>

### engine.registerFunc(name, func, [authenticate])
Register the function to FaaS Engine

**Kind**: instance method of [<code>Engine</code>](#Engine)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name of the function. |
| func | [<code>EngineFunction</code>](#EngineFunction) |  | Function to be registered |
| [authenticate] | <code>boolean</code> | <code>false</code> | Check authentication. If true, the function will only be called when the request is authenticated |

<a name="Callback"></a>

## Callback(res)
Callback to be called before returning from function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>Object</code> | Response to be given back to the client. |

<a name="EngineFunction"></a>

## EngineFunction(params, cb)
Callback for realtime updates to the subscribed data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Params received by function. |
| cb | [<code>Callback</code>](#Callback) | The callback function. |

