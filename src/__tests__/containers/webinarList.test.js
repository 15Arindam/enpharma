import WebinarList from '../../containers/webinarList';
import {setup, findByAttr } from '../../test-utils';
import { data } from '../../api/webinar_data';
import { initialState } from '../../store/reducers/webinars';

describe('Containers', () => {
    describe(' WebinarList ',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(WebinarList,{},{ webinars: { ...initialState }});
        })
        it('should render correctly',() => {
            expect(wrapper);
        });
        it('should contain no data initially',() => {
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('No Data Found')
        })
        it('should show expected error',() => {
            wrapper = setup(WebinarList,{},{ webinars: { ...initialState, error: 'Failed' }});
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('Failed')
        })
        it('should show loading state',() => {
            wrapper = setup(WebinarList,{},{ webinars: { ...initialState, loading: true }});
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('Loading...')
        })
        it('should render 4 nos of webinars',() => {
            const testData = data.slice(0,4);
            wrapper = setup(WebinarList,{},{ webinars: { ...initialState, data: testData }});
            expect(findByAttr(wrapper,'webinars').children()).toHaveLength(4);
        })
    });
});