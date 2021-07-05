import axios from 'axios';

let paxios = axios.create();

export default class Api {
    static async get(route) {
        return await this.execute(route, null, 'get');
    }

    static async post(route, params) {
        return await this.execute(route, params, 'post');
    }

    static async execute(route, params, verb) {
        let request = ["https://restcountries.eu/" + route];
        if (params) {
            request.push(params);
        }

        let result = await paxios[verb](...request);
        return result;
    }
}