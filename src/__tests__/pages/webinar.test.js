import { setup, findByAttr } from '../../test-utils';
import Webinar from '../../pages/webinar';
import { initialState } from '../../store/reducers/webinars';
import { data } from '../../api/webinar_data';

describe('Pages', () => {
    describe('Webinars', () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = setup(Webinar,{},{ webinars: { ...initialState } })
        })
        it('should render correctly', () => {
            expect(wrapper);
        })
        it('should be no data initially',() => {
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('No data');
        })
        it('should contain expected data',() => {
            const testData = data.filter(d => d.id === 1)
            wrapper = setup(Webinar,{},{ webinars: { ...initialState, current: {...testData[0],_authors: ["John Brown"]} } })
            expect(findByAttr(wrapper,'title').text()).toEqual(testData[0].title);
            let embedId = findByAttr(wrapper,'embed-id').props('image')['image'].split('/');
            embedId = embedId[embedId.length - 1];
            expect(embedId).toEqual(testData[0].embed_id);
            expect(findByAttr(wrapper,'avatar').text()).toEqual('JB');
            expect(findByAttr(wrapper,'body').text()).toEqual(testData[0].description);
            expect(findByAttr(wrapper,'date').props('primary')['primary'].split(': ')[1])
            .toEqual(new Date(testData[0].last_updated).toDateString());
        })
        it('should contain error', () => {
            wrapper = setup(Webinar,{},{ webinars: { ...initialState,error:'Data Test' } })
            expect(findByAttr(wrapper,'container').children().dive().text()).toEqual('Data Test');
        })
    });
});