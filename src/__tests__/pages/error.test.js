import React from 'react';
import { shallow } from 'enzyme';
import Error from '../../pages/error';

describe('Pages', () => {
    describe('Error', () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = shallow(<Error/>);
        })
        it('should render correctly', () => {
            expect(wrapper);
        })
    });
});