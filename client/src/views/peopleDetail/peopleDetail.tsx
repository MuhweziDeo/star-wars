import { ApolloError } from '@apollo/client';
import { styled } from 'baseui';
import { Button, SIZE } from 'baseui/button';
import { ArrowLeft } from 'baseui/icon';
import { Skeleton } from 'baseui/skeleton';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    StyledBody
} from 'baseui/card';
import { People } from '../peopleList/people.model';
import { StyledLink } from 'baseui/link';
import { Container } from '../../components/container';

export interface Props {
    loading: boolean;
    data: { personDetail: People } | undefined;
    error: ApolloError | undefined;
}

export const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
});

export const PeopleDetail: React.FunctionComponent<Props> = ({ loading, data }) => {
    const renderBackButton = () => {
        return (<Centered>
            <Link to="/"> <Button size={SIZE.mini} startEnhancer={() => <ArrowLeft size={24} />} >Back</Button></Link>
        </Centered>)
    }
    if (loading) {
        return (<>
          {renderBackButton()}
        <Centered>
            <Skeleton height="300px" width="600px" />
        </Centered>
        </>)
    }
    return (
        <Container>
        {renderBackButton()}
        <Centered>
        <Card
            overrides={{ Root: { style: { width: '600px' } } }}
            title={'Name: ' +  data?.personDetail.name}>
            <StyledBody>
                    <p> Height: {data?.personDetail?.height + ' meters'} </p>
                    <p>Gender: {data?.personDetail?.gender}</p>
                    <p>Mass: {data?.personDetail?.mass}</p>
                    <StyledLink target="_blank" href={data?.personDetail.homeworld}>HomeWorld</StyledLink>
            </StyledBody>
            </Card>
        </Centered>
        </Container>
    )
}
export default PeopleDetail;