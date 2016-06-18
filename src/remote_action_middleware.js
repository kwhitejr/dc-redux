import fetch from 'isomorphic-fetch';
import reducer from './reducer';

export default store => next => action => {
  console.log('in middleware', action);

  return next(action);

}