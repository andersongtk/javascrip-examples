"use strict"

/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {number} age
 * @param {string} position
 * @constructor
 */
function WorkerEntity(firstName, lastName, age, position) {
    /**
     * @type {null|number}
     * @private
     */
    this._id = null;

    /**
     * @type {null|number}
     * @private
     */
    this._createdAt = null;

    /**
     * @type {null|number}
     * @private
     */
    this._updatedAt = null;

    /**
     * @returns {number}
     */
    this.getId = function () {
        if (this._id === null) {
            throw new SyntaxError("This entity has not been saved.");
        }

        return this._id;
    };

    /**
     * @returns {string}
     */
    this.getFirstName = function () {
        return this._firstName;
    };

    /**
     * @param {string} value
     */
    this.setFirstName = function (value) {
        if (typeof value !== "string") {
            throw new SyntaxError("First name must be string type.");
        }

        this._firstName = value;
    };

    /**
     * @returns {string}
     */
    this.getLastName = function () {
        return this._lastName;
    };

    /**
     * @param {string} value
     */
    this.setLastName = function (value) {
        if (typeof value !== "string") {
            throw new SyntaxError("Last name must be string type.");
        }

        this._lastName = value;
    }

    /**
     * @returns {number}
     */
    this.getAge = function () {
        return this._age;
    };

    /**
     * @param {number} value
     */
    this.setAge = function (value) {
        if (typeof value !== "number" || !Number.isInteger(value)) {
            throw new SyntaxError("Age must be integer type.");
        }

        this._age = value;
    }

    /**
     * @returns {string}
     */
    this.getPosition = function () {
        return this._position;
    };

    /**
     * @param {string} value
     */
    this.setPosition = function (value) {
        if (typeof value !== "string") {
            throw new SyntaxError("Position must be string type.");
        }

        this._position = value;
    }

    /**
     * @returns {number}
     */
    this.getCreatedAt = function () {
        if (this._createdAt === null) {
            throw new SyntaxError("This entity has not been saved.");
        }

        return this._createdAt;
    };

    /**
     * @returns {number}
     */
    this.getUpdatedAt = function () {
        if (this._updatedAt === null) {
            throw new SyntaxError("This entity has not been saved.");
        }

        return this._updatedAt;
    };

    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setAge(age);
    this.setPosition(position);
}
