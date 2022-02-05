import React from 'react';
import ProdList,{ Product } from '../../containers/productList';
import {setup, findByAttr } from '../../test-utils';
import { initialState } from '../../store/reducers/products';
import { shallow } from 'enzyme';

describe('Containers', () => {
    describe('ProdList',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(ProdList,{},{ products: { ...initialState }});
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should contain no data initially',() => {
            expect(findByAttr(wrapper,'div').childAt(0).dive().text()).toEqual('No Data Found')
        })
        it('should show expected error',() => {
            wrapper = setup(ProdList,{},{ products: { ...initialState, error: 'Failed' }});
            expect(findByAttr(wrapper,'div').childAt(0).dive().text()).toEqual('Failed')
        })
        it('should show loading state',() => {
            wrapper = setup(ProdList,{},{ products: { ...initialState, loading: true }});
            expect(findByAttr(wrapper,'div').childAt(0).dive().text()).toEqual('Loading...')
        })
    });
    describe('Product',() => {
        let wrapper;
        it('should render correctly',() => {
            wrapper = shallow(<Product/>);
            expect(wrapper);
        })
        // it('should render correctly',() => {
        //     wrapper = shallow(<Product/>);
        //     expect(wrapper);
        // })
        // it('should render correctly',() => {
        //     wrapper = shallow(<Product/>);
        //     expect(wrapper);
        // })
    })
});