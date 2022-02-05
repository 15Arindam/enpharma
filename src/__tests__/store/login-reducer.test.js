import { initialState } from '../../store/reducers/login';
import { login, register } from '../../store/actions/login';
import { getStore } from '../../test-utils';
import moxios from 'moxios';
import { dbInst } from '../../api/endpoints';

describe('reducers', () => {
  describe('login', () => {
    let store;

    describe('login and register action dispatcher', () => {
      beforeEach(() => {
        store = getStore({ auth: { ...initialState }});
        moxios.install(dbInst);
      })
      afterEach(() => {
          moxios.uninstall(dbInst);
      })

      it('should match the login response', () => {
        const testResponse = {
          token: 'some.token',
          data: [
            {first_name: 'alex'}
          ]
        };
        const data = { email: 'aa@bb.cc', password: '123456' }

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: testResponse
          });
        });

        return store.dispatch(login(data))
        .then(() => {
          const newState = store.getState().auth;
          expect(newState.response).toEqual(testResponse);
        })
      })
      it('should match the register response', () => {
        const testResponse = {
          status: 200,
          data: {
            registration: 'SUCCESS'
          }
        };
        const data = { email: 'aa@bb.cc', password: '123456' }

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: testResponse
          });
        });

        return store.dispatch(register(data))
        .then(() => {
          const newState = store.getState().auth;
          expect(newState.response).toEqual(testResponse);
        })
      })
    })
  })
})