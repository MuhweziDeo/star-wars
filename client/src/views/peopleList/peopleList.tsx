import React from "react";
import {Button} from 'baseui/button';
import {useDispatch, useSelector} from "react-redux";
import {showLoader} from "../../store/loader/actions";
import {RootState} from "../../store";

export const PeopleList: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state: RootState) => state.loading)
    return (
        <div>
            <p>PeopleList</p>
            <Button onClick={() => dispatch(showLoader(!loading))}>Show Loader</Button>
        </div>
    )
}