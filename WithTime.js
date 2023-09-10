const { EventEmitter } = require('./EventEmitter');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');

            const startTime = new Date();
            const result = await asyncFunc(...args);
            const endTime = new Date();
            const executionTime = endTime - startTime;

            this.emit('end');
            this.emit('data', result);
            console.log(`Time taken: ${executionTime} ms`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = {
    WithTime
}
