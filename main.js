"use strict"

/**
 * @param {String} firstName
 * @param {String} lastName
 * @param {Number} age
 * @param {String} position
 * @constructor
 */
const WorkerEntity = function (firstName, lastName, age, position) {

    /**
     * @type {null|Number}
     * @private
     */
    this._id = null;

    /**
     * @type {Number}
     * @private
     */
    this._age = age;

    /**
     * @type {String}
     * @private
     */
    this._firstName = firstName;

    /**
     * @type {String}
     * @private
     */
    this._lastName = lastName;

    /**
     * @type {String}
     * @private
     */
    this._position = position;

    /**
     * @type {null|Number}
     * @private
     */
    this._createdAt = null;

    /**
     * @type {null|Number}
     * @private
     */
    this._updatedAt = null;

    /**
     * @returns {Number}
     */
    this.getId = function () {
        return this._id;
    }

    /**
     * @returns {String}
     */
    this.getFirstName = function () {
        return this._firstName;
    };

    /**
     * @returns {String}
     */
    this.getLastName = function () {
        return this._lastName;
    };

    /**
     * @returns {Number}
     */
    this.getAge = function () {
        return this._age;
    }

    /**
     * @returns {String}
     */
    this.getPosition = function () {
        return this._position;
    }

    /**
     * @returns {Number}
     */
    this.getCreatedAt = function () {
        return this._createdAt;
    }

    /**
     * @returns {Number}
     */
    this.getUpdatedAt = function () {
        return this._updatedAt;
    }
};

/**
 * @param {Storage} storage
 * @constructor
 */
const WorkerRepository = function (storage) {

    const key = 'workers'

    /**
     * @param {Number} id
     * @returns {WorkerEntity|null}
     */
    this.findById = function (id) {
        return this.all().filter(worker => worker.getId() === id)[0] || null;
    };

    /**
     * @param {WorkerEntity} worker
     * @returns {WorkerEntity}
     */
    this.save = function (worker) {
        if (worker["_id"]) {
            this.delete(worker);
        }

        worker["_id"] = worker["_id"] || Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        worker["_createdAt"] = worker["_createdAt"] || Date.now();
        worker["_updatedAt"] = Date.now();

        let workers = this.all();
        workers.push(worker);
        this._saveAllToStorage(workers);

        return worker;
    };

    /**
     * @param {WorkerEntity} worker
     */
    this.delete = function (worker) {
        this._saveAllToStorage(this.all().filter(item => item.getId() !== worker.getId()));
    };

    /**
     *
     */
    this.deleteAll = function () {
        this._saveAllToStorage([]);
    };

    /**
     * @returns {Array<WorkerEntity>}
     */
    this.all = function () {
        return JSON.parse(storage.getItem(key) || '[]').map(function (item) {
            let worker = new WorkerEntity(
                item["first_name"],
                item["last_name"],
                item["age"],
                item["position"]
            );
            worker["_id"] = item["id"];
            worker["_createdAt"] = item["created_at"];
            worker["_updatedAt"] = item["updated_at"];

            return worker;
        });
    };

    /**
     * @param {Array<WorkerEntity>} workers
     * @private
     */
    this._saveAllToStorage = function (workers) {
        storage.setItem(key, JSON.stringify(workers.map(worker => ({
            "id": worker.getId(),
            "first_name": worker.getFirstName(),
            "last_name": worker.getLastName(),
            "age": worker.getAge(),
            "position": worker.getPosition(),
            "created_at": worker.getCreatedAt(),
            "updated_at": worker.getUpdatedAt(),
        }))));
    };
};


const repository = new WorkerRepository(window.localStorage);

const popov = repository.save(new WorkerEntity("Andrey", "Popov", 36, "Manager"));
const otroh = repository.save(new WorkerEntity("Ivan", "Otroh", 33, "Admin"));
const motuz = repository.save(new WorkerEntity("Ira", "Motuz", 33, "Devops"));

setTimeout(function(){
    repository.delete(popov);
    repository.delete(otroh);
    repository.delete(motuz);
}, 6000);
