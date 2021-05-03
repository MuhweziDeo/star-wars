import React, { useMemo } from "react";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import {
    Card,
    StyledBody,
    StyledAction,
} from "baseui/card";
import { StyledLink } from "baseui/link";
import { Button, SIZE } from 'baseui/button';
import { Notification, KIND } from 'baseui/notification';
import { Pagination } from "baseui/pagination";
import { ApolloError } from "@apollo/client";
import { Link } from "react-router-dom";
import { Input, SIZE as InputSize } from "baseui/input";
import { PeopleResponse } from "./people.model";
import { ContentLoader } from "../../components/contentLoader";
import { Centered } from "../peopleDetail/peopleDetail";
import { Search } from "baseui/icon";


export interface Props {
    loading: boolean;
    data: PeopleResponse | undefined,
    page: number,
    setPage(page: number): void,
    error: ApolloError | undefined,
    searchText: string;
    setSearchText(text: string): void
}

export const PeopleList: React.FunctionComponent<Props> = ({ data, loading,
    page, setPage = () => {}, error, searchText, setSearchText = () => {} }) => {
    const getId = (index: number) => {
        return (10 * page) - 10 + (index + 1)
    }
    const renderContent = useMemo(() => {
        return data?.people?.results.map((person, index) => <FlexGridItem key={index}>
            <Card
                overrides={{ Root: { style: { width: '328px' } } }}
                title={person.name}
            >
                <StyledBody>
                    Height: {person.height} <br />
                </StyledBody>
                <StyledAction>
                <Link to={`/${getId(index)}`}>
                    <StyledLink>View</StyledLink>
                </Link>
                </StyledAction>
            </Card>
        </FlexGridItem>)
    }, [data?.people?.results])

    return (
        <>
            <Centered>
                <Input
                    value={searchText}
                    onChange={({target: {value}}:  React.ChangeEvent<HTMLInputElement>) => setSearchText(value)}
                    startEnhancer={<Search size="18px" />}
                    placeholder="Search Your favorite Character"
                    overrides={{ Root: { style: { width: "60%", marginTop: "10px", marginBottom: "10px" } } }}
                    size={InputSize.default} clearable clearOnEscape />
            </Centered>
            {error && <Notification overrides={{
                Body: { style: { width: 'auto' } },
            }} kind={KIND.negative} closeable>
                {() => error?.message || "Something went wrong there"}
            </Notification>}
            {loading && <ContentLoader contentLength={9} />}

            {!loading && <FlexGrid
                flexGridColumnCount={[1, 1, 2, 4]}
                $style={() => ({
                    margin: '1rem'
                })}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800">
                {renderContent}
            </FlexGrid>}
            <Pagination
                numPages={Math.ceil((data?.people?.count || 82) / 10)}
                currentPage={page}
                onPageChange={({ nextPage }) => {
                    setPage(
                        Math.min(Math.max(nextPage, 1), data?.people?.count || 0)
                    );
                }}
            />
        </>
    )
}
