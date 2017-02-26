# Sir 🎩 ver
A tiny, very polite, server for building simple async HTTP services.

# Install
```
npm i -S sirver
```

# API
The following methods are exposed:

| method | arguments | returns | description |
| --- | --- | --- | --- |
| [sir](#sirrequesthandler) | Yes | Object | Creates and returns an instance of the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) Object. |
| [bodyParser](#bodyparserrequest) | Yes | Promise | Parses and returns an incoming HTTP JSON request body as a JavaScript Object. |

## sir(requestHandler)
Creates and returns an instance of the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) Object.

### Arguments
| argument | type | required | description |
| --- | --- | --- | --- |
| requestHandler | Function | Yes | This handler is invoked upon every incoming HTTP request and exposes the [http.incomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) and [http.serverResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) Objects. The `requestHandler` supports `async-await`, see [this example](#async) for more information. |

#### Response convenience methods
The `requestHandler` exposes a couple of convenience methods on the
`http.serverResponse` Object:

- `res.status(code:Number)`: `code` is a valid http status code.
- `res.html(html:String)`: `html` is a valid HTML document representation.
- `res.json(data:Object)`: `data` is a valid JavaScript Object, which can be parsed to JSON.

See the [examples](#examples) section for more information.

### Returns
[http.Server](https://nodejs.org/api/http.html#http_class_http_server)

## bodyParser(request, limit)
Parses and returns an incoming HTTP JSON request body as a JavaScript Object.

### Arguments
| argument | type | required | description |
| --- | --- | --- | --- |
| request | Object | Yes | The [http.incomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) Object, exposed by [requestHandler](#sirrequesthandler). See [this example](#parsing-request-body) for more information. |
| limit | Number or String | No | The byte limit of the body. This is the number of bytes or any string format supported by [bytes](https://github.com/visionmedia/bytes.js), for example `1000`, `'500kb'` or `'3mb'`. If the body ends up being larger than this limit, a `413` error code is returned. **Defaults to 1 MB**. |

_Note that the [raw-body](https://github.com/stream-utils/raw-body) module is used
for body parsing functionality._

### Returns
`Promise`

# Examples

## Basic
```js
'use strict';

const { sir } = require('sirver');

const server = sir((req, res) => {
	res.end('ok');
});

server.listen(7777);
```

## JSON
```js
'use strict';

const { sir } = require('sirver');

const server = sir((req, res) => {
	res.json({ status: 'ok' });
});

server.listen(7777);
```

## HTML
```js
'use strict';

const { sir } = require('sirver');

const server = sir((req, res) => {
	res.html(`
		<!DOCTYPE html>

		<html>
			<head>
				<title>HTML</title>
			</head>

			<body>
				<h1>Hello World!</h1>
			</body>
		</html>
	`);
});

server.listen(7777);
```

## Async
```js
'use strict';

const { sir } = require('sirver');

const server = sir(async (req, res) => {
	const _async = () => new Promise(
		(resolve, reject) => {
			setTimeout(
				() => resolve({ status: 'async' }),
				2e3
			)
		}
	);

	const data = await _async();

	res.json(data);
});

server.listen(7777);
```

## Parsing request body
```js
'use strict';

const { sir, bodyParser } = require('sirver');

const server = sir(async (req, res) => {
	const body = await bodyParser(req);

	console.log('request body: ', body);

	res.end();
});

server.listen(7777);
```

## Custom response codes
```js
'use strict';

const { sir, bodyParser } = require('sirver');

const server = sir(async (req, res) => {
	const { name } = await bodyParser(req);

	if (!name) {
		return res
			.status(400)
			.json({ error: 'Name is required' });
	}

	res.json({ name });
});

server.listen(7777);
```

## Route handling
```js
'use strict';

const url = require('url');
const { sir, bodyParser } = require('sirver');

const server = sir(async (req, res) => {
	try {
		const { method } = req;
		const { pathname } = url.parse(req.url);

		if (method === 'GET' && pathname === '/') {
			return res.json({
				status: 'ok for route "/"'
			});
		}

		if (method === 'POST' && pathname === '/run') {
			return res.json({
				status: 'ok for route "/run"'
			});
		}

		res.status(404).json({
			error: 'The requested route doesn\'t exist.'
		});
	} catch (err) {
		res.status(err.code || 500).json({
			error: err.toString()
		});
	}
});

server.listen(7777);
```

# Engine
Node `7.6` or greater is required due to use of `async-await`.

# Todos
There's no proper error handling yet.

# License
MIT Copyright (c) 2017 Daniël Illouz
