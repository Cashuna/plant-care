"use strict";

var should = require("chai").should();

var convertHt = function(unit, val) {
	if (typeof unit !== "string") {
		throw new Error ("data is not a string");
	}
	else {
		if (unit === "feet") {
        	return val * 12;
	    }
	    else {
	        return val;
	    }
	};
};

describe("ConvertHt", function() {
	it("should convert plant measurements that are in feet to inches based on the units in the database", function() {

		convertHt("feet", 2).should.equal(24);
	});

	it("should not multiply when passed inches", function() {
		convertHt("inches", 10).should.equal(10);
	});

	it("should throw an error when not passed a string unit", function() {
		(function() {
			convertHt(12, 10)
		})
		.should.throw("Error");
	});
});