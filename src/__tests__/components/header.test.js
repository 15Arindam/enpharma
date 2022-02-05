import { setup, findByAttr, getMockStore } from '../../test-utils';
import Header from '../../components/header';
import { UNSET_USER } from '../../store/actions/actionTypes';
import { shallow } from 'enzyme';
import React from 'react';

describe('Components', () => {
    describe('Header',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Header,{})
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('navigation div should contain two child on Auth', () => {
            wrapper = setup(Header,{},{ isUser:{ userId: 107, name: 'Alex' } });
            const testDiv = findByAttr(wrapper,'auth-childs');
            expect(testDiv.children()).toHaveLength(2);
        })
        it('should dispatch UNSET_USER on logout',() => {
            const store = getMockStore({ isUser:{ userId: 107, name: 'Alex' } })
            wrapper = shallow(<Header store={store}/>).dive().dive()
            findByAttr(wrapper,'auth-logout').simulate('click');
            expect(store.getActions()).toContainEqual({ type: UNSET_USER })
        })
    });
})