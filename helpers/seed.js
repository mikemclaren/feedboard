"use strict";

const config = require("../config.json");
const r = require("rethinkdb");
const co = require("co");

co(function* coWrap() {
	const connection = yield r.connect(config.site.db);

	try {
		yield r.dbCreate(config.site.db.db).run(connection);
		console.log(`Databse '${config.site.db.db}' created successfully.`);
	} catch (err) {
		console.log(`Warning! ${err.msg}`);
	}

	try {
		yield r.db(config.site.db.db).tableCreate("activity").run(connection);
		console.log("Table 'activity' created successfully.");
	} catch (err) {
		console.log(`Warning! ${err.msg}`);
	}

	yield connection.close();
	console.log("\nYou're all set!");
	console.log(`Open http://${config.site.db.host}:8080/#tables to view the database.`);
	process.exit();
}).catch(errorHandler);

function errorHandler(err) {
	console.error("Error occurred!", err);
	throw err;
	process.exit();
}
