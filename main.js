"use strict"

const repository = new WorkerRepository(window.localStorage);

const popov = repository.save(new WorkerEntity("Andrey", "Popov", 36, "Manager"));
const otroh = repository.save(new WorkerEntity("Ivan", "Otroh", 33, "Admin"));
const motuz = repository.save(new WorkerEntity("Ira", "Motuz", 33, "Devops"));
console.log(repository.all());
setTimeout(function () {
    repository.delete(repository.findById(popov.getId()));
    repository.delete(repository.findById(otroh.getId()));
    repository.delete(repository.findById(motuz.getId()));
}, 6000);
