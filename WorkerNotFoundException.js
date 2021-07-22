"use strict"

/**
 * @param {string} message
 * @returns {Error}
 * @constructor
 */
function WorkerNotFoundException(message) {
    const error = new Error(message);
    error.code = 404;

    return error;
}

WorkerNotFoundException.prototype = Object.create(Error.prototype);