"use strict";

const config = require("../config.json");

const model = require("../models/feeds.js");
const socket = require("./sockets");

const moment = require("moment");

module.exports.process = function* process() {
	this.state.api = true;
	// which plugin are they wanting to use?
	const provider = this.params.provider;
	if (config.site.plugins.indexOf(provider) === -1) {
		// they didn't pass a plugin that isn't supported
		return this.body = {error: true, message: "Provider not supported"};
	}
	// the plugin they are trying to use is available, let's send it over
	const result = model.process(provider, this.request.header, this.request.body);
	// set the time on it
	result.timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");
	// if there's an error, just return it
	if (result.error === true) {
		return this.body = result;
	}
	// there wasn't an error, so send out a socket event
	socket.update(result);
	return this.body = result;
};
