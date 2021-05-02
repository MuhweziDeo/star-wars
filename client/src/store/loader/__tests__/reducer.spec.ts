import { Actions } from "../actions";
import reducer from "../reducer";

describe("Loader Reducer", () => {
    it("should return default state ", () => {
        expect(reducer(undefined, {} as any)).toEqual({loading: false});
    })

    it("should set loading based on action.loading ", () => {
        expect(reducer(undefined, {type: Actions.SHOW_LOADER, loading: true})).toEqual({loading: true});
        expect(reducer(undefined, {type: Actions.SHOW_LOADER, loading: false})).toEqual({loading: false});

    })
})