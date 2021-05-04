import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, gql } from "@apollo/client";

import { useParams } from 'react-router-dom';
import { showLoader } from '../../store/loader/actions';
import { People } from '../peopleList/people.model';

export const GET_PERSON_QUERY = gql`
query getPersonDetail($personId: Int) {
    personDetail(personId: $personId) {
        name
        height
        homeworld
        mass
        gender
    }
} `

const PeopleDetail = React.lazy(() => import("./peopleDetail"));

export const PeopleDetailView = () => {
    const { personId } = useParams<{personId: string}>();
    const {data, loading, error} = useQuery<{personDetail: People}, {personId: number}>(GET_PERSON_QUERY, {variables: {
        personId: Number(personId)
    }});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader(loading))
    }, [loading])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PeopleDetail
                data={data}
                loading={loading}
                error={error}
            />
        </Suspense>
    )
}