import { initialState } from '../../store/reducers/slides';
import { getSlides } from '../../store/actions/slides';
import { getStore, getMockStore } from '../../test-utils';
import { data } from '../../api/carousel_data';
import moxios from 'moxios';
import { apiInst } from '../../api/endpoints';
import { ERR_SLIDES, LOADN_SLIDES } from '../../store/actions/actionTypes';

describe('reducers', () => {
  describe('Carousel', () => {
    let store;

    describe('Carousel action dispatcher', () => {
        describe('mock requests',() => {
            beforeEach(() => {
                store = getStore({ slides: { ...initialState }});
                moxios.install(apiInst);
              })
              afterEach(() => {
                moxios.uninstall(apiInst);
              })
        
              it('contains the expected slides', () => {
                const testResponse = {
                  data: data
                };
        
                moxios.wait(() => {
                  const request = moxios.requests.mostRecent();
                  request.respondWith({
                    status: 200,
                    response: testResponse
                  });
                });
        
                return store.dispatch(getSlides())
                .then(() => {
                  const newState = store.getState().slides;
                  expect(newState.data).toEqual(testResponse);
                })
              })
        })
        describe('mock store', () => {
            beforeEach(() => {
                store = getMockStore({ slides: { ...initialState }})
                store.dispatch(getSlides());
              })
        
              it('should show error', () => {
                const testErr = { type: ERR_SLIDES, value: 'Error: Failed' };
                store.dispatch(testErr);
                expect(store.getActions()).toContainEqual(testErr,{ type: LOADN_SLIDES })
              })
        })
        describe('test store', () => {
            beforeEach(() => {
                store = getStore({ slides: { ...initialState }})
                store.dispatch(getSlides());
              })
        
              it('should show error', () => {
                store.dispatch({ type: ERR_SLIDES, value: 'Error: Failed' });
                const newState = store.getState().slides;
                expect(newState.error).toEqual('Error: Failed');
                expect(newState.loading).toEqual(false);
              })
        })
    })
  })
})