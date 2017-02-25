'use strict';

const http = require('http');

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
	}
};
