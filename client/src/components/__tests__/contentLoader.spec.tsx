import React from 'react';
import { FlexGrid } from 'baseui/flex-grid';
import TestRenderer from 'react-test-renderer';
import { ContentLoader } from '../contentLoader';

describe("ContentLoader", () => {
    it("should render without crushing", () => {
        const component = TestRenderer.create(<ContentLoader/>)
        expect(component.toJSON()).toMatchSnapshot();
    })

    it("should render 15 items by default", () => {
        const component = TestRenderer.create(<ContentLoader/>)
        expect(component.toJSON()).toMatchSnapshot();
        const flexGrid = component.root.findByType(FlexGrid)
        expect(flexGrid.props.children.length).toBe(15);
    })

    it("should render number items by provided contentLength", () => {
        const component = TestRenderer.create(<ContentLoader contentLength={30}/>)
        expect(component.toJSON()).toMatchSnapshot();
        const flexGrid = component.root.findByType(FlexGrid)
        expect(flexGrid.props.children.length).toBe(30);
    })
})