import React from 'react';
import { shallow } from 'enzyme';
import MyCard from '../../components/cards';

describe('Components', () => {
    describe(' MyCards ',() => {
        let cards;
        beforeEach(() => {
            cards = [ {
                id: 1,
                image_path: '',
                title: '',
                description: ''
            },
            {
                id: 2,
                image_path: '',
                title: '',
                description: ''
            },
            {
                id: 3,
                image_path: '',
                title: '',
                description: ''
            } ]
        })
        it('should render correctly',() => {
            const wrapper = shallow(<MyCard card={cards[0]}/>)
            expect(wrapper);
        });
    });
});