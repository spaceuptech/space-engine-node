# Client API for Space Cloud

## Installation

```bash
$ npm install space-engine-node --save
```

## Quick Start

### Create Engine Instance

```js
const Engine = require('space-engine-node');

const engine = new Engine('my-engine');
```

**Note: All instances with same engine name are automatically load balanced.**

### Register the function 
```js
engine.registerFunc('my-func', (params, auth, cb) => {
console.log('Params:', params, 'Auth', auth)
// Do something

const res = { ack: true, message: 'Function as a Service is Awesome!' }
cb('response', res)
})
```

**Note: Enable Functions module in Space Cloud, run space-exec and nats server to be able to use it.**

## Classes

<dl>
<dt><a href="#Engine">Engine</a></dt>
<dd><p>Class representing the Engine Interface.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Callback">Callback(type, res)</a></dt>
<dd><p>Callback to be called before returning from function.</p>
</dd>
<dt><a href="#EngineFunction">EngineFunction(params, auth, cb)</a></dt>
<dd><p>Callback for realtime updates to the subscribed data</p>
</dd>
</dl>

<a name="Engine"></a>

## Engine
Class representing the Engine Interface.

**Kind**: global class  

* [Engine](#Engine)
    * [new Engine(engineName, opts)](#new_Engine_new)
    * [.registerFunc(name, func)](#Engine+registerFunc)

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
engine.registerFunc('my-func', (params, auth, cb) => {
console.log('Params:', params, 'Auth', auth)
// Do something

const res = { ack: true, message: 'Function as a Service is Awesome!' }
cb('response', res)
})
```
<a name="Engine+registerFunc"></a>

### engine.registerFunc(name, func)
Register the function to FaaS Engine

**Kind**: instance method of [<code>Engine</code>](#Engine)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the function. |
| func | [<code>EngineFunction</code>](#EngineFunction) | Function to be registered |

<a name="Callback"></a>

## Callback(type, res)
Callback to be called before returning from function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Type of callback action to be performed. |
| res | <code>Object</code> | Data to be sent to client. |

<a name="EngineFunction"></a>

## EngineFunction(params, auth, cb)
Callback for realtime updates to the subscribed data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Params received by function. |
| auth | <code>Object</code> | Auth object of client. Will be undefined if request is unauthenticated. |
| cb | [<code>Callback</code>](#Callback) | The callback function to be called by the function. |

