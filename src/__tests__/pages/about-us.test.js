import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../../pages/about-us';

describe('Pages', () => {
    describe('About Us', () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = shallow(<AboutUs/>);
        })
        it('should render correctly', () => {
            expect(wrapper);
        })
    });
});