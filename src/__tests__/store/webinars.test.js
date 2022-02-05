import { initialState } from '../../store/reducers/webinars';
import { getWebinar, getWebinars } from '../../store/actions/webinars';
import { getStore } from '../../test-utils';
import { data } from '../../api/webinar_data';
import moxios from 'moxios';
import { apiInst } from '../../api/endpoints';

describe('reducers', () => {
  describe('Webinars', () => {
    let store;

    describe('webinars action dispatcher', () => {

      beforeEach(() => {
        store = getStore({ webinars: { ...initialState }});
        moxios.install(apiInst);
      })
      afterEach(() => {
        moxios.uninstall(apiInst);
      })

      it('contains the expected webinars', () => {
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

        return store.dispatch(getWebinars())
        .then(() => {
          const newState = store.getState().webinars;
          expect(newState.data).toEqual(testResponse);
        })
      })
      it('contains the expected webinar by Id', () => {
        const id = 1;
        const testResponse = data.filter( d => d.id === id );
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: testResponse
          });
        });
        return store.dispatch(getWebinar(id))
        .then(() => {
          const newState = store.getState().webinars;
          expect(newState.current).toEqual(testResponse[0]);
        })
      })
    })
  })
})