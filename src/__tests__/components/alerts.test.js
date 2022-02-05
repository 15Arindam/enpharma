import {setup, findByAttr} from '../../test-utils';
import Alerts,{ Alert } from '../../components/alerts';

describe('Components', () => {
    describe('Alerts',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Alerts,{},{alerts: [
                {
                    msg: 'Hello',
                    type: 'success',
                    id: '123'
                }
            ]})
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should contain one alert', () => {
            expect(wrapper).toHaveLength(1);
        })
        it('should contain Alert component',() => {
            expect(findByAttr(wrapper,'snackbar').children().type()).toEqual(Alert);
        })
        it('should contain same alert message', () => {
            const test = findByAttr(wrapper,'alert')
            expect(test.children().text()).toEqual('Hello');
        })
    });
})