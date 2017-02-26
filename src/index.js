'use strict';

const http = require('http');
const url = require('url');
const contentType = require('content-type');
const getRawBody = require('raw-body');
const { throwNoReqHandlerError,	throwNoReqError } = require('./err');
const { isPost,	isGet, isPut, isPatch, isDelete } = require('./req');
const {	status,	html, json } = require('./res');

module.exports = {
	sir(handler = throwNoReqHandlerError()) {
		const server = http.createServer((req, res) => {
			req.isPost = isPost;
			req.isGet = isGet;
			req.isPut = _sPut;
			req.isPatch = isPatch;
			req.isDelete = isDelete;
			res.status = status;
			res.html = html;
			res.json = json;

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
		req = throwNoReqError(),
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
