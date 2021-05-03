import { ApolloError } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { Centered, PeopleDetail } from '../peopleDetail';
import { GET_PEOPLE_QUERY } from '../../peopleList';
import { Card } from 'baseui/card';
import { Skeleton } from 'baseui/skeleton';


describe("PeopleDetails", () => {
    it("should render without crushing", () => {
        const component = TestRenderer.create(
            <Router>
                <PeopleDetail
                    loading={false}
                    data={undefined}
                    error={new ApolloError({ networkError: new Error("error message") })}
                />
            </Router>)
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("should render content", async() => {
        const mock = {
            request: {
                query: GET_PEOPLE_QUERY,
                variables: { personId: 1 }
            },
            result: {
               data: { personDetail: { name: "test", height: "test", homeworld: "test" }}
            }
        }
        const component = TestRenderer.create(
            <Router>
                <MockedProvider mocks={[mock]}>
                    <PeopleDetail
                        loading={false}
                        data={{personDetail: { name: "test", height: "test", homeworld: "test", mass: "test", gender: "test"}}}
                        error={undefined}
                    />
                </MockedProvider>
            </Router>)
        await new Promise(resolve => setTimeout(resolve, 0));
    
        // expect(component.toJSON()).toEqual(""); 
        const centered = component.root.findAllByType(Centered);
        expect(centered).toBeDefined();
        // card centered div is in position 1
        // expect(centered[1].props.children).toContain("test");
        const card = centered[1].findByType(Card);
        expect(card).toBeDefined();
        const paragraph = component.root.findAllByType('p');
        expect(paragraph.length).toBe(3)
    })



    it("should render loader", async() => {
        const mock = {
            request: {
                query: GET_PEOPLE_QUERY,
                variables: { personId: 1 }
            },
            result: {
               data: { personDetail: { name: "test", height: "test", homeworld: "test" }}
            }
        }
        const component = TestRenderer.create(
            <Router>
                <MockedProvider mocks={[mock]}>
                    <PeopleDetail
                        loading
                        data={{personDetail: { name: "test", height: "test", homeworld: "test", mass: "test", gender: "test"}}}
                        error={undefined}
                    />
                </MockedProvider>
            </Router>)
        await new Promise(resolve => setTimeout(resolve, 0));
        const skeleton = component.root.findAllByType(Skeleton);
        expect(skeleton).toBeDefined();
    })
});