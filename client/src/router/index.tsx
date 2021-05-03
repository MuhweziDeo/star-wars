import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { PeopleDetailView } from "../views/peopleDetail";
import { PeopleListView } from '../views/peopleList';
import AppNavBar from "../components/navigation";

export default () => {
    return (
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
    )
}