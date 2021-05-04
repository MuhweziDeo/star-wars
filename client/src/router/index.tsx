import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { PeopleDetailView } from "../views/peopleDetail";
import {styled} from 'baseui';
import { PeopleListView } from '../views/peopleList';
import AppNavBar from "../components/navigation";

const StyledDiv = styled("div", ({$theme}) => {
    return {
        backgroundColor: $theme.colors.background
    }
})
export default () => {
    return (
        <StyledDiv>
        <Router>
            <AppNavBar/>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={PeopleListView}
                />

                <Route
                    exact
                    path="/:personId"
                    component={PeopleDetailView}
                />      
            </Switch>
        </Router>
        </StyledDiv>
    )
}