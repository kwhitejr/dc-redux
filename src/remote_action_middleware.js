import fetch from 'isomorphic-fetch';
import reducer from './reducer';

export default store => next => action => {
  console.log('in middleware', action);

  if (action.type !== 'GET_DISTRICT') return next(action);

  fetch(action.url, {
    method: action.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.body)
  })
  .then(response => response.json())
  .then(json => action.cb(json, store.dispatch));


  // return next(action);
}