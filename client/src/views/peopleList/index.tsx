import React, {useEffect, useState} from "react";

import { PeopleList } from './peopleList';
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/actions";
import { PeopleResponse } from "./people.model";

export const GET_PEOPLE_QUERY = gql`
query getPeople($page: Int) {
    people(page: $page) {
        count
        results {
            name
            height
            homeworld
            mass
        }
    }
} 
`
export const PeopleListView = () => {
    const[page, setPage] = useState(1);
    const dispatch = useDispatch();
    const {data, loading, error} = useQuery<PeopleResponse, {page: number}>(GET_PEOPLE_QUERY, {
        variables: {
            page
        }
    })

    useEffect(() => {
        dispatch(showLoader(loading));
    }, [loading])


    return (<PeopleList
            data={data}
            loading={loading}
            page={page}
            setPage={setPage}
            error={error}
    />)
}