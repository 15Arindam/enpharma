import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/footer';
import { findByAttr } from '../../test-utils';

describe('Components', () => {
    describe(' Footer ',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<Footer/>)
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should have 3 sections',() => {
            const test = findByAttr(wrapper, 'footer-sec');
            expect(test.children()).toHaveLength(3);
        })
    });
});