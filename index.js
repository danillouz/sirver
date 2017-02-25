'use strict';

const http = require('http');

module.exports = {
	sir(handler) {
		const server = http.createServer((req, res) => {
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
