import { initialState } from '../../store/reducers/setUser';
import { setUser, unsetUser } from '../../store/actions/setUser';
import { getStore } from '../../test-utils';

describe('reducers', () => {
  describe('set User', () => {
    let store;
    describe('set User action dispatcher', () => {

      beforeEach(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiW3tcImlkXCI6MTA3LFwiZmlyc3RfbmFtZVwiOlwiQWxleFwiLFwibGFzdF9uYW1lXCI6XCJNXCIsXCJlbWFpbFwiOlwiYWxleEBNLmNvbVwifV0iLCJpYXQiOjE1MTYyMzkwMjIsImF1ZGllbmNlIjoiVEVTVCJ9.jB91z3IHFfs2lxnUtbQYx8cRTtvOoGrt6vsL14bjN44';
        localStorage.setItem('token',token)
        store = getStore({ isUser: { ...initialState }});
      })

      it('token contains the expected details', () => {
        store.dispatch(setUser());
        const expectedState = {
            name: 'Alex',
            userId: 107
        }
        const newState = store.getState().isUser;
        expect(newState).toEqual(expectedState);
      })
      it('action deletes the token', () => {
        store.dispatch(unsetUser());
        const expectedState = { ...initialState };
        const newState = store.getState().isUser;
        expect(newState).toEqual(expectedState);
      })
    })
  })
})