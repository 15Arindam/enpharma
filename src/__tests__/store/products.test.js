import { initialState } from '../../store/reducers/products';
import { getProducts } from '../../store/actions/products';
import { getStore } from '../../test-utils';
import { data } from '../../api/product_data';
import moxios from 'moxios';
import { apiInst } from '../../api/endpoints';

describe('reducers', () => {
  describe('products', () => {
    let store;

    describe('products action dispatcher', () => {

      beforeEach(() => {
        store = getStore({ products: { ...initialState }});
        moxios.install(apiInst);
      })
      afterEach(() => {
        moxios.uninstall(apiInst);
      })

      it('contains the expected products', () => {
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

        return store.dispatch(getProducts())
        .then(() => {
          const newState = store.getState().products;
          expect(newState.data).toEqual(testResponse);
        })
      })
    })
  })
})