'use strict';

module.exports = {
	status(code) {
		this.statusCode = code;

		return this;
	},

	json(data = { }) {
		this.statusCode = this.statusCode || 200;
		this.setHeader('Content-Type', 'application/json');
		this.end(
			JSON.stringify(data)
		);
	},

	html(html = '') {
		this.statusCode = this.statusCode || 200;
		this.setHeader('Content-Type', 'text/html');
		this.end(html);
	}
};
