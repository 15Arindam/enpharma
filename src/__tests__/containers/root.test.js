import {setup, findByAttr} from '../../test-utils';
import Root from '../../containers/root';
import { Switch, Route } from 'react-router';

describe('Containers', () => {
    describe(' Root ',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Root,{},{ auth:{}, isUser: {} })
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should contain 5 routes',() => {
            expect(wrapper.find(Switch).children()).toHaveLength(9);
            expect(wrapper.find(Switch).childAt(0).type()).toBe(Route);
        })
        it('should mount backdrop', () => {
            wrapper = setup(Root,{},{ auth: { loading: true }, isUser:{} })
            const backdrop = findByAttr(wrapper,'backdrop');
            expect(backdrop.prop('open')).toBe(true);
        })
    });
});