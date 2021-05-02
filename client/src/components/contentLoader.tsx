import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Skeleton} from "baseui/skeleton";
import React from "react";

export interface Props {
    contentLength?: number
}
export const ContentLoader: React.FunctionComponent<Props> = ({contentLength = 15}) => {
    const renderSkeleton = () => Array.from(Array(contentLength).keys()).map((index) => <FlexGridItem key={index}><Skeleton height="150px" width="300px"/></FlexGridItem> )
    return (
        <FlexGrid
            className="loader"
            data-testid = "loader"
            flexGridColumnCount={4}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            {renderSkeleton()}

        </FlexGrid>
    )
}