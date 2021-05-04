import React from 'react'
import TestRenderer from 'react-test-renderer';
import { Container } from '../container';

describe('Container', () => {
    it("should render without crushing", () => {
        const container = TestRenderer.create(<Container>
            <p>hello</p>
        </Container>)
        expect(container.toJSON()).toMatchSnapshot();
        const paragraph = container.root.findByType("p");
        expect(paragraph).toBeDefined();
        expect(paragraph.props.children).toContain("hello");
    })
})