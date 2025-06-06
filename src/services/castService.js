import Cast from '../models/Cast.js';

export default {
    create(castData) {
        return Cast.create(castData); // returns a promise form the document we will create; ONLY return the reslut/promise
        // it will be awaited in the caller of the func
    },
    getAll(filter) {
        let query = Cast.find();
        if(filter.exclude) {
            // exclude comes from the controller
            //mongodb 
            //query = query.find({_id: {$nin: filter.exclude}}) // all whose ids is not in the provided array; $ nin - not int
            //express
            query = query.nin('_id', filter.exclude);

            return query;
        }
        return Cast.find(); //returns promise
    },

}