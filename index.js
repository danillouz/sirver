'use strict';

const http = require('http');
const contentType = require('content-type');
const getRawBody = require('raw-body');

function _status(code) {
	this.statusCode = code;

	return this;
}

function _json(data = { }) {
	this.statusCode = this.statusCode || 200;
	this.setHeader('Content-Type', 'application/json');
	this.end(
		JSON.stringify(data)
	);
}

function _html(html = '') {
	this.statusCode = this.statusCode || 200;
	this.setHeader('Content-Type', 'text/html');
	this.end(html);
}

module.exports = {
	sir(handler) {
		const server = http.createServer((req, res) => {
			res.status = _status;
			res.html = _html;
			res.json = _json;

			Promise
				.resolve(handler(req, res))
				.catch(err => {
					// TODO: error handling

					console.error('Sirver Hanlder Exceptcion: ', err);
				});
		});

		return server;
	},

	async bodyParser(req, limit = '1mb') {
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
				console.log(
					`Oh dear! The request body exceeded the ${limit} limit.`,
					err
				);
			} else {
				// 400
				console.log(
					`Oh my! You've sent invalid JSON.`,
					err
				);
			}
		}
	}
};
