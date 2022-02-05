import { initialState } from '../../store/reducers/webinars'
import {setup, findByAttr} from '../../test-utils';
import Home from '../../containers/home';
import { data } from '../../api/webinar_data';
import MyCard from '../../components/cards';

describe('Containers', () => {
    describe(' Home ',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Home,{},{ webinars: { ...initialState }})
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should have expected heading',() => {
            expect(findByAttr(wrapper,'home-heading').text()).toEqual('Upcoming Webinars')
        })
        it('should render 4 nos of webinars',() => {
            const testData = data.slice(0,4);
            wrapper = setup(Home,{},{ webinars: { ...initialState, data: testData }});
            expect(findByAttr(wrapper,'webinars').children()).toHaveLength(4);
        })
        it('should be of type MyCard',() => {
            const testData = data.slice(0,4);
            wrapper = setup(Home,{},{ webinars: { ...initialState, data: testData }});
            expect(findByAttr(wrapper,'webinars').childAt(0).type()).toBe(MyCard);
        })
    });
});