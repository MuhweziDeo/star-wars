import axios from "../../plugins/axios";
import mockAxiosAdapter from "axios-mock-adapter";
import { getPeople } from "../people.resolver";
const mockAxios = new mockAxiosAdapter(axios);

describe("GetPeople Resolver", () => {
    afterAll(() => {
        mockAxios.restore();
    });
    it("should return people on get", async (done) => {
        mockAxios.onGet().reply(200, {count: 80, results: []});
        const response = await getPeople({}, {page:1});
        expect(response.count).toEqual(80);
        expect(response.results).toEqual([]);
        done();
    });
});