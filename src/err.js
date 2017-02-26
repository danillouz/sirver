'use strict';

module.exports = {
	throwNoReqHandlerError() {
		throw new Error(
			'Excuse me! A request handler is required. ' +
			'For Example: `sir((req, res) => res.end(\'ok\'))`.'
		);
	},

	throwNoReqError() {
		throw new Error(
			'I beg your pardon! A request Object is required. ' +
			'It\'s exposed by the request handler you passed to the `sir()` method. ' +
			'For example: `bodyParser(req).then(console.log)`.'
		);
	},

	throwNoPathError() {
		throw new Error(
			'Oh dear! A path is required. ' +
			'For Example: `req.isGet(\'/path\'() => res.end(\'ok\'))`.'
		);
	},

	throwNoPathHandlerError() {
		throw new Error(
			'Sorry to bother you! A path handler is required. ' +
			'For Example: `req.isGet(\'/path\'() => res.end(\'ok\'))`.'
		);
	}
};
