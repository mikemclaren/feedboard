"use strict";

module.exports.process = (header, data) => {
	// TODO: check for hash correctness?
	// assume all checks have passed here
	const returnObj = slackProcessing["message"](data);
	console.log(data);
	returnObj.error = false;
	returnObj.icon = "fa-slack";
	returnObj.avatar = "/assets/img/slack-logo.png";
	// send it back
	return returnObj;
};

const slackProcessing = {
	message: (data) => {
		const message = data.text.split("announce")[1].trim();
		return {
			title: `${data.user_name} posted a message in #${data.channel_name}`,
			content: message
		};
	}
};
