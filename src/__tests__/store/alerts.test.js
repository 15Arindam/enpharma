import { initialState } from '../../store/reducers/alerts';
import { setAlert } from '../../store/actions/alerts';
import { getStore } from '../../test-utils';
import { HIDE_ALERT } from '../../store/actions/actionTypes';

describe('reducers', () => {
  describe('Alerts', () => {
    let store;

    describe('alerts action dispatcher', () => {

      beforeEach(() => {
        store = getStore({ alerts: [ ...initialState ]});
      })

      it('contains the expected alert from the store', () => {
        const data = { msg: 'Hello', type: 'success', id : 12345 }
        store.dispatch(setAlert( 'Hello','success',12345 ));
        const newState = store.getState().alerts;
        expect(...newState).toEqual(data);
      })
      it('contains the expected alerts from the store', () => {
        const data = [
            { msg: 'Hello', type: 'success', id : 12345 },
            { msg: 'Hi', type: 'error', id : 93432 }
        ]
        store.dispatch(setAlert( 'Hello','success',12345 ));
        store.dispatch(setAlert( 'Hi','error',93432 ));
        const newState = store.getState().alerts;
        expect(newState).toEqual(data);
      })
    })
    describe('alerts hide action dispatcher', () => {

      beforeEach(() => {
        store = getStore({ alerts: [ ...initialState ]});
        store.dispatch(setAlert( 'Hello','success',12345 ));
      })

      it('contains no alert from the store', () => {
        store.dispatch({ type: HIDE_ALERT, value: 12345 });
        const newState = store.getState().alerts;
        expect(newState).toEqual([]);
      })
    })
  })
})