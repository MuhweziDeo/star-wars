import React, {useEffect, useState} from "react";

import { PeopleList } from './peopleList';
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/actions";
import { PeopleResponse } from "./people.model";

export const GET_PEOPLE_QUERY = gql`
query getPeople($page: Int, $searchText: String!) {
    people(page: $page, searchText: $searchText) {
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
    const[searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const {data, loading, error} = useQuery<PeopleResponse, {page: number, searchText?: string}>(GET_PEOPLE_QUERY, {
        variables: {
            page, 
            searchText: searchText.trim().length ? searchText.trim() : "",
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
            searchText={searchText}
            setSearchText={setSearchText}
    />)
}