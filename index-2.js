const { WithTime } = require('./WithTime');
const axios = require("axios");
// task 2
const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', ({data}) => console.log(JSON.stringify(data,null, 2)))

console.log(withTime.rawListeners("end"));
withTime.execute(() => axios(URL));
