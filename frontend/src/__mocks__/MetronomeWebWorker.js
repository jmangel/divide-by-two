class Worker {
  constructor() {
    // Note that `onmessage` should be overwritten by the code using the worker.
    this.onmessage = () => { };
  }

  postMessage(data) {
    this.onmessage({ data: fibonacci(data) });
  }
}

module.exports = Worker;