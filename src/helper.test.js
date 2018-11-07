import {extractResource} from "./helper";

describe('helper', () => {
    it('extract resource from url', () => {
        const url = 'https://swapi.co/api/people/1/';
        let {resource, id} = extractResource(url)
        expect(resource).toBe('people');
        expect(id).toBe('1');
    });
});