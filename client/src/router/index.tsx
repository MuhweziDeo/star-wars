import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { PeopleListView } from '../views/peopleList';

export default () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    component={PeopleListView}
                />

            </Switch>
        </Router>
    )
}