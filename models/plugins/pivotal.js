"use strict";

module.exports.process = (header, data) => {
	// TODO: check for hash correctness?
	// assume all checks have passed here
	const returnObj = pivotalProcessing["activity"](data);
	returnObj.error = false;
	returnObj.icon = "fa-asterisk";
	returnObj.avatar = "/assets/img/pivotal-logo.png";
	returnObj.plugin = "pivotal";
	// send it back
	return returnObj;
};

const pivotalProcessing = {
	activity: (data) => {
		return {
			title: data.message,
			content: `Project: ${data.project.name} - #${data.primary_resources[0].id} [${data.primary_resources[0].story_type}]<br>${data.primary_resources[0].name}`
		};
	}
};
