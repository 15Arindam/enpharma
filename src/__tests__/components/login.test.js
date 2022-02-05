import React from 'react';
import Login from '../../components/login';
import {setup, findByAttr, getMockStore } from '../../test-utils';
import { initialState } from '../../store/reducers/login';
import { shallow } from 'enzyme';
import { LOGGED_IN, LOADING } from '../../store/actions/actionTypes';

describe('Components', () => {
    describe('Login',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Login,{},{ auth: { ...initialState }})
        })
        it('should render correctly',() => {
            expect(wrapper)
        });
        it('should contain 5 fields', () => {
            expect(wrapper.find('form').childAt(0).children()).toHaveLength(5);
        })
        describe('[check]fields on change',() => {
            it('should match --contact-- field values with change',() => {
                findByAttr(wrapper,'contact').simulate('change',{
                    target:{
                        value: '9456323231',
                    },
                });
                const changedField = findByAttr(wrapper,'contact');
                expect(changedField.prop('value')).toEqual('9456323231');
            })
            it('should match --email-- field values with change',() => {
                findByAttr(wrapper,'email').simulate('change',{
                    target:{
                        value: 'aaa@bbb.ccc',
                    },
                });
                const changedField = findByAttr(wrapper,'email');
                expect(changedField.prop('value')).toEqual('aaa@bbb.ccc');
            })
            it('should match --firstname-- field values with change',() => {
                findByAttr(wrapper,'fname').simulate('change',{
                    target:{
                        value: 'Alex',
                    },
                });
                const changedField = findByAttr(wrapper,'fname');
                expect(changedField.prop('value')).toEqual('Alex');
            })
            it('should match --lastname-- field values with change',async() => {
                findByAttr(wrapper,'lname').simulate('change',{
                    target:{
                        value: 'Mercer',
                    },
                })
                const changedField = findByAttr(wrapper,'lname');
                expect(changedField.prop('value')).toEqual('Mercer');
            })
            it('should match --password-- field values with change',() => {
                findByAttr(wrapper,'password').simulate('change',{
                    target:{
                        value: 'Pass123',
                    },
                });
                const changedField = findByAttr(wrapper,'password');
                expect(changedField.prop('value')).toEqual('Pass123');
            })
        })
        describe('submit button',() => {
            it('should be disabled initially',() => {
                const btn = findByAttr(wrapper,'submit-btn');
                expect(btn.prop('disabled')).toBeTruthy();
            })
            it('should dispatch LOADING when submitted forcefully', () => {
                const store = getMockStore({ auth: { ...initialState }, isUser: {}});
                wrapper = shallow(<Login store={store}/>).dive().dive();
                const fakeEvent = { preventDefault: () => {return} };
                const form = findByAttr(wrapper,'form')
                form.simulate('submit',fakeEvent)
                expect(store.getActions()).toContainEqual({ type: LOADING })
            })
        })
        describe('auth mode toggle button',() => {
            it('should be disabled initially',() => {
                const btn = findByAttr(wrapper,'authMode-test');
                btn.simulate('click');
                const changedBtn = findByAttr(wrapper,'authMode-test');
                expect(changedBtn.text()).toEqual('Sign Up');
            })
        })
    });
})