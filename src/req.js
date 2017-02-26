'use strict';

const url = require('url');
const {	throwNoPathError, throwNoPathHandlerError } = require('./err');

module.exports = {
	isPost(
		path = throwNoPathError(),
		handler = throwNoPathHandlerError()
	) {
		const { pathname } = url.parse(this.url);
		const isPost = this.method === 'POST';
		const isMatch = pathname === path;

		isPost && isMatch && handler();
	},

	isGet(
		path = throwNoPathError(),
		handler = throwNoPathHandlerError()
	) {
		const { pathname } = url.parse(this.url);
		const isGet = this.method === 'GET';
		const isMatch = pathname === path;

		isGet && isMatch && handler();
	},

	isPut(
		path = throwNoPathError(),
		handler = throwNoPathHandlerError()
	) {
		const { pathname } = url.parse(this.url);
		const isPut = this.method === 'PUT';
		const isMatch = pathname === path;

		isPut && isMatch && handler();
	},

	isPatch(
		path = throwNoPathError(),
		handler = throwNoPathHandlerError()
	) {
		const { pathname } = url.parse(this.url);
		const isPatch = this.method === 'PATCH';
		const isMatch = pathname === path;

		isPatch && isMatch && handler();
	},

	isDelete(
		path = throwNoPathError(),
		handler = throwNoPathHandlerError()
	) {
		const { pathname } = url.parse(this.url);
		const isDelete = this.method === 'DELETE';
		const isMatch = pathname === path;

		isDelete && isMatch && handler();
	}
};
