import Cast from '../models/Cast.js';

export default {
    create(castData) {
        return Cast.create(castData); // returns a promise form the document we will create; ONLY return the reslut/promise
        // it will be awaited in the caller of the func
    },
    getAll() {
        return Cast.find(); //returns promise
    }
}