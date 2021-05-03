import React, {useMemo} from "react";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import { Card,
    StyledBody,
    StyledAction,
} from "baseui/card";
import { StyledLink } from "baseui/link";
import {Button, SIZE} from 'baseui/button';
import { Notification, KIND } from 'baseui/notification';
import { Pagination } from "baseui/pagination";
import { ApolloError } from "@apollo/client";

import { PeopleResponse } from "./people.model";
import { ContentLoader } from "../../components/contentLoader";
import { Link } from "react-router-dom";

export  interface Props {
    loading: boolean;
    data: PeopleResponse | undefined,
    page: number,
    setPage(page: number): void,
    error: ApolloError | undefined
}

export const PeopleList: React.FunctionComponent<Props> = ({data, loading,
                                                               page, setPage, error}) => {
    const getId = (index: number) => {
      return (10 * page) - 10 + (index + 1)
    }
    const renderContent = useMemo(() => {
        return data?.people?.results.map((person,index) =>  <FlexGridItem key={index}>
            <Card
                overrides={{Root: {style: {width: '328px'}}}}
                title={person.name}
            >
                <StyledBody>
                   Height: {person.height} <br/>
                </StyledBody>
                <StyledAction>
                    <FlexGrid flexGridColumnCount={2}>
                        <FlexGridItem>
                            <Link to={`/${getId(index)}`}>
                                <StyledLink>View</StyledLink>
                            </Link>
                        </FlexGridItem>
                       <FlexGridItem>
                           <Button size={SIZE.mini}>
                               See HomeWorld
                           </Button>
                       </FlexGridItem>
                    </FlexGrid>
                </StyledAction>
            </Card>
        </FlexGridItem>)
    },[data?.people?.results])
    return (
        <>
            {error && <Notification overrides={{
                Body: {style: {width: 'auto'}},
            }} kind={KIND.negative} closeable>
                {() => error?.message || "Something went wrong there"}
            </Notification>}
            {loading && <ContentLoader contentLength={9}/>}
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
                numPages={Math.ceil((data?.people?.count || 82) /10)}
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
