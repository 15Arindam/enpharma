import React from 'react';
import { shallow } from 'enzyme';
import MyProfile from '../../pages/my-profile';
import { setup } from '../../test-utils';
import { initialState } from '../../store/reducers/setUser';

describe('Pages', () => {
    describe('My Profile', () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = setup(MyProfile, {}, { auth: { ...initialState } })
        })
        it('should render correctly', () => {
            expect(wrapper);
        })
    });
});