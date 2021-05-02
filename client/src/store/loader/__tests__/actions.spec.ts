import { Actions, showLoader } from "../actions";
 
describe("LOADER ACTIONs", () => {
    it("should return action", () => {
        const expectedAction = {
            type: Actions.SHOW_LOADER, loading: false
        }
        expect(showLoader(false)).toEqual(expectedAction);
    })
})