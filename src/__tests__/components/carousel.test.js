import Carousel from '../../components/carousel';
import {setup, findByAttr } from '../../test-utils';
import { data } from '../../api/carousel_data';
import { initialState } from '../../store/reducers/slides';
import { Skeleton } from '@material-ui/lab';

describe('Components', () => {
    describe('Carousel',() => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(Carousel,{},{ slides: { ...initialState }})
        })
        it('should render correctly',() => {
            expect(wrapper)
        });
        it('should contain no data initially',() => {
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('No Data Found')
        })
        it('should show expected error',() => {
            wrapper = setup(Carousel,{},{ slides: { ...initialState, error: 'Failed' }});
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('Failed')
        })
        it('should show loading state',() => {
            wrapper = setup(Carousel,{},{ slides: { ...initialState, loading: true }});
            expect(findByAttr(wrapper,'container').children().type()).toEqual(Skeleton)
        })
        it('should render 2 nos of slides',() => {
            const testData = data.slice(0,2);
            wrapper = setup(Carousel,{},{ slides: { ...initialState, data: testData }});
            expect(findByAttr(wrapper,'slides').children()).toHaveLength(2);
        })
    });
});