import axios from "../../plugins/axios";
import mockAxiosAdapter from "axios-mock-adapter";
import { getPeople, getPersonDetails } from "../people.resolver";
import { People } from "../../models/people.model";

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

    it("should return people on get person details", async (done) => {
        const person: People = {name: "John", mass: "16", homeworld: "earth", height: "25", gender: "Male"};
        mockAxios.onGet().reply(200, person);
        const response = await getPersonDetails({}, {personId:1});
        expect(response).toEqual(person);
        done();
    });
});