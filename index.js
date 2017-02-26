'use strict';

const http = require('http');
const contentType = require('content-type');
const getRawBody = require('raw-body');

function _throwNoReqHandlerError() {
	throw new Error(
		'Excuse me! A request handler is required. ' +
		'For Example: `sir((req, res) => res.end(\'ok\'))`.'
	);
}

function _throwNoReqError() {
	throw new Error(
		'I beg your pardon! A request Object is required. ' +
		'It\'s exposed by the request handler you passed to the `sir()` method. ' +
		'For example: `bodyParser(req).then(console.log)`.'
	);
}

function _status(code) {
	this.statusCode = code;

	return this;
}

function _html(html = '') {
	this.statusCode = this.statusCode || 200;
	this.setHeader('Content-Type', 'text/html');
	this.end(html);
}

function _json(data = { }) {
	this.statusCode = this.statusCode || 200;
	this.setHeader('Content-Type', 'application/json');
	this.end(
		JSON.stringify(data)
	);
}

module.exports = {
	sir(handler = _throwNoReqHandlerError()) {
		const server = http.createServer((req, res) => {
			res.status = _status;
			res.html = _html;
			res.json = _json;

			Promise
				.resolve(handler(req, res))
				.catch(err => {
					// TODO: error handling
					console.error('Sirver Request Handler Exception: ', err);
				});
		});

		return server;
	},

	async bodyParser(
		req = _throwNoReqError(),
		limit = '1mb'
	) {
		try {
			const length = req.headers['content-length'];
			const encoding = contentType.parse(req).parameters.charset;

			const options = {
				limit,
			    length,
			    encoding
			};

			const str = await getRawBody(req, options);
			const json = JSON.parse(str);

			return json;
		} catch (err) {
			// TODO: error handling
			if (err.type === 'entity.too.large') {
				// 413
				console.log(`Request body exceededs the ${limit} limit.`, err);
			} else {
				// 400
				console.log(`Invalid JSON received.`, err);
			}
		}
	}
};
