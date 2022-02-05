import React from 'react';
import { shallow } from 'enzyme';
import { Navigation, DrawerNavs } from '../../components/navigation';
import { NavLink } from 'react-router-dom';

describe('Components', () => {
    describe(' <Navigation /> ',() => {

        it('should render correctly',() => {
            const wrapper = shallow(<Navigation/>)
            expect(wrapper);
        });
        it('should not have login nav on Authed',() => {
            const wrapper = shallow(<Navigation auth/>);
            expect(wrapper.find(NavLink)).toHaveLength(4);
        })
    });

    describe(' <DrawerNavs /> ',() => {

        it('should render correctly',() => {
            const wrapper = shallow(<DrawerNavs/>)
            expect(wrapper);
        });
        it('should not have login nav on Authed',() => {
            const wrapper = shallow(<DrawerNavs auth/>);
            expect(wrapper.find(NavLink)).toHaveLength(3);
        })
    });
});