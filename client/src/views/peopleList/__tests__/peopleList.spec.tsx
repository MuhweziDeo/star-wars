import React from "react";
import { PeopleList } from "../peopleList";
import  { render, screen } from '@testing-library/react';
import {ApolloError} from "@apollo/client";
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer'
import { GET_PEOPLE_QUERY } from "..";
import { FlexGrid } from "baseui/flex-grid";
import { Notification } from "baseui/notification";
import { Input } from "baseui/input";

describe("Graphql PeopleList", () => {

    it("should render", () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <PeopleList
                    searchText="searchText"
                    setSearchText={() => {}}
                    loading
                    data={{people: {results: [{name: "test", gender: "male", height:"90", mass: "33", homeworld: "http://example.com"}], count: 1}}}
                    page={1}
                    setPage={() => {}}
                    error={ new ApolloError({networkError: new Error("error message")})}
            />
            </MockedProvider>
        )
        const tree = component.toJSON();
        expect(tree).toBeDefined()
    })

    it("should render content", async() => {
        const mock = {
            request: {
              query: GET_PEOPLE_QUERY,
              variables: { name: 'Buck' },
            },
            result: {
              data: { people: {results: [{name: "test", gender: "male", height:"90", mass: "33", homeworld: "http://example.com"}], count: 8}},
            },
          };
        const component = TestRenderer.create(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <PeopleList
                    searchText="searchText"
                    setSearchText={() => {}}
                    loading={false}
                    data={undefined}
                    page={1}
                    setPage={() => {}}
                    error={ new ApolloError({networkError: new Error("error message")})}
                />
            </MockedProvider>
        )
        await new Promise(resolve => setTimeout(resolve, 0));
        const [flexGrid] = component.root.findAllByType(FlexGrid);
        expect(flexGrid.children.length).toBe(1);
     
    })

    it("should render notification on error", async() => {
        const mock = {
            request: {
              query: GET_PEOPLE_QUERY,
              variables: { name: 'Buck' },
            },
            error: new Error('An error occurred'),
          };
        const component = TestRenderer.create(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <PeopleList
                    searchText="searchText"
                    setSearchText={() => {}}
                    loading={false}
                    data={undefined}
                    page={1}
                    setPage={() => {}}
                    error={ new ApolloError({networkError: new Error("error message")})}
                />
            </MockedProvider>
        )
        await new Promise(resolve => setTimeout(resolve, 0));
        const [notification] = component.root.findAllByType(Notification);
        expect(notification).toBeDefined();
        expect(notification.props.children()).toBe("error message")
    })

    it("should render Loader incase of loading", async () => {
        const handlers = {
            setPage: () => {}
        }
        render(<PeopleList
                searchText="searchText"
                setSearchText={() => {}}
                loading
                data={{people: {results: [{name: "test", gender: "male", height:"90", mass: "33", homeworld: "http://example.com"}], count: 1}}}
                page={1}
                setPage={handlers.setPage}
                error={ new ApolloError({networkError: new Error("error message")})}
        />)

        const [loader] =  screen.queryAllByTestId("loader");
        expect(loader).toBeDefined();
        expect(loader.innerHTML).toContain("flex-grid-item");
        expect(loader.innerHTML).toContain("loader");

    })

    it("should call setSearch text", async () => {
        const handlers = {
            setPage: () => {}, setSearchText: () => {},
        }
        const spy = jest.spyOn(handlers, "setSearchText");
        const component = TestRenderer.create(
                <PeopleList
                    searchText="searchText"
                    setSearchText={handlers.setSearchText}
                    loading
                    data={{people: {results: [{name: "test", gender: "male", height:"90", mass: "33", homeworld: "http://example.com"}], count: 1}}}
                    page={1}
                    setPage={handlers.setPage}
                    error={ new ApolloError({networkError: new Error("error message")})}
            />
        )
        const input = component.root.findByType(Input);
        input.props.onChange({target: {value: "search"}});
        expect(spy).toBeCalled();
        expect(spy).not.toHaveBeenCalledWith("search")
    })
});