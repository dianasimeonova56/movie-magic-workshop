import { log } from 'node:console';
import fs from 'node:fs/promises'
import { v4 as uuid } from 'uuid'

const movieJson = await fs.readFile('./src/database.json');
export const movies = JSON.parse(movieJson);


export default class Movie {
    constructor(data) {
        this.data = data;
    }

    async save() {
        this.data.id = uuid();
        //movieData.id = uuid();
        this.data.rating = Number(this.data.rating);

        movies.push(this.data);

        await fs.writeFile('./src/database.json', JSON.stringify(movies, null, 4));

        return this.data;
    }
}