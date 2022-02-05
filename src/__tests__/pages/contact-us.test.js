import React from 'react';
import { shallow } from 'enzyme';
import ContactUs from '../../pages/contact-us';

describe('Pages', () => {
    describe('Contact Us', () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = shallow(<ContactUs/>);
        })
        it('should render correctly', () => {
            expect(wrapper);
        })
    });
});