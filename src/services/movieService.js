import Movie from '../models/Movie.js';
import Cast from '../models/Cast.js'
//2nd layer - services
//services - data rendering? receiving and displaying


export default {
      getAll(filter = {}) { //by default filter is empty
        //let result = await Movie.find({}); // returns a query, await - returns a document
        //we can say .lean() and return from the query a js object
        //only use when we need the objects, to populate or filter
        //bc it only returns objects
        let query = Movie.find(); // we do not await, we just get the query 
    
        //let result = await Movie.find({}).lean();

        if(filter.search) { 
            query = query.find({title: {$regex: new RegExp(filter.search, 'i')}})
        }

        if(filter.genre) {
            query = query.find({genre: filter.genre.toLowerCase()})
            console.log(query);
            
        }

        if(filter.year) {
            query = query.find({year: filter.year});
        }
        
        return query;
    },
    create(movieData, userId) {
       const movie = new Movie(movieData);

       movie.owner = userId;
        
        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId).populate('casts'); 
        // populate - before we await the document, populate the given array, not with just the ids
        //it will get all the referenced casts and populate the array
        

        console.log(movie);
        
        return movie;
    },
    async attach(movieId, castId) {
        //var1 
        const movie = await this.getOne(movieId); //document
        
        movie.casts.push(castId); // we can do this bc its a document
        return movie.save();
    },
    // async getCasts(movieId) {
    //     const movie = await this.getOne(movieId);

    //     const casts = await Cast.find({_id: {$in: movie.casts}});

    //     return casts;
    // }
}