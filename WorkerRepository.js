"use strict"

/**
 * @param {Storage} storage
 * @constructor
 */
function WorkerRepository(storage) {

    /**
     * @type {string}
     */
    const key = 'workers'

    /**
     * @returns {Array<WorkerEntity>}
     */
    this.all = function () {
        const workers = storage.getItem(key);

        if (workers === null) {
            return [];
        }

        return JSON.parse(workers).map(function (item) {
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
     * @param {number} id
     * @returns {WorkerEntity}
     * @throws {WorkerNotFoundException}
     */
    this.findById = function (id) {
        let worker = this.all().find(function (worker) {
            return worker.getId() === id;
        });

        if (worker === undefined) {
            throw new WorkerNotFoundException("Worker not found.");
        }

        return worker;
    };

    /**
     * @param {WorkerEntity} worker
     * @returns {WorkerEntity}
     */
    this.save = function (worker) {
        let workers = this.all();

        if (!worker["_id"]) {
            worker["_id"] = this._buildId();
            worker["_createdAt"] = Date.now();
            worker["_updatedAt"] = Date.now();

            workers.push(worker);
            this._saveToStorage(workers);

            return worker;
        }

        let index = workers.findIndex(function (item) {
            return item.getId() === worker.getId();
        });

        if (index === -1) {
            throw new WorkerNotFoundException("Worker not found.");
        }

        workers.splice(index, 1, worker);
        this._saveToStorage(workers);

        return worker;
    };

    /**
     * @param {WorkerEntity} worker
     * @throws {WorkerNotFoundException}
     */
    this.delete = function (worker) {
        const workers = this.all();
        const index = workers.findIndex(function (item) {
            return item.getId() === worker.getId()
        });

        if (index === -1) {
            throw new WorkerNotFoundException("Worker not found.");
        }

        workers.splice(index, 1);
        this._saveToStorage(workers);
    };

    /**
     * @param {Array<WorkerEntity>} workers
     * @private
     */
    this._saveToStorage = function (workers) {
        const preparedWorkersToSave = workers.map(function (worker) {
            return {
                "id": worker.getId(),
                "first_name": worker.getFirstName(),
                "last_name": worker.getLastName(),
                "age": worker.getAge(),
                "position": worker.getPosition(),
                "created_at": worker.getCreatedAt(),
                "updated_at": worker.getUpdatedAt(),
            };
        });

        storage.setItem(key, JSON.stringify(preparedWorkersToSave));
    };

    /**
     * @returns {number}
     * @private
     */
    this._buildId = function () {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    }
}