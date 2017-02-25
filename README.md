# Sir 🎩 ver
A tiny, but very polite, server to build simple async HTTP services.

# Install
```
npm i -S sirver
```

# API
- sir
- bodyParser

# Examples

### Basic
```js
const { sir } = require('sirver');

const server = sir((req, res) => {
	res.end('ok');
});

server.listen(7777);
```

### JSON
```js
const { sir } = require('sirver');

const server = sir((req, res) => {
	res.json({ status: 'ok' });
});

server.listen(7777);
```

### HTML
```js
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

### Async
```js
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

### Parsing request body
```js
const { sir, bodyParser } = require('sirver');

const server = sir(async (req, res) => {
	const body = await bodyParser(req);

	console.log('request body: ', body);

	res.end();
});

server.listen(7777);
```

### Custom response codes
```js
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

# Engine
Node `7.6` or greater is required due to use of `async-await`.

# License
MIT Copyright (c) 2017 Daniël Illouz
