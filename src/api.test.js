import api from './api';

describe('API', () => {
    describe('list resource', () => {
        it('list 10 item every time', async () => {
            const res = await api.resource.list('people');
            expect(res.data.results.length).toBe(10);
        });
        it('accept page as second additional attribute', async () => {
            const res = await api.resource.list('people', 2);
            const {results} = res.data;
            expect(results[0].name).toBe('Anakin Skywalker');
        });
        it('throw error when there is no data', async () => {})
    });

    describe('get resource', () => {
        it('get id 11 in "people" as Anakin Skywalker', async () => {
            const res = await api.resource.get('people', 11);
            const {data} = res;
            expect(data.name).toBe('Anakin Skywalker');
        })
    })
});