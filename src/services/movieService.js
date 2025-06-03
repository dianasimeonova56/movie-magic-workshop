import Movie from '../models/Movie.js';
//2nd layer - services
//services - data rendering? receiving and displaying


export default {
     async getAll(filter = {}) { //by default filter is empty
        //let result = await Movie.find({}); // returns a query, await - returns a document
        //we can say .lean() and return from the query a js object
        //only use when we need the objects, to populate or filter
        //bc it only returns objects
    
        let result = await Movie.find({}).lean();

        if(filter.search) { 
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        if(filter.genre) {
            //result = result.filter(movie => movie.genre.localeCompare(filter.genre, undefined, {sensitivity: 'accent'})===0);
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        }

        if(filter.year) {
            result = result.filter(movie => movie.year === filter.year)
        }
        
        return result;
    },
    create(movieData) {
       const movie = new Movie(movieData);
        
        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId);

        console.log(movie);
        
        return movie;
    }
}