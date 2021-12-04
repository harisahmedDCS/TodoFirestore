import {LOGIN_USER} from './types';

export const loginUser = userInfo => dispatch => {
  dispatch({
    type: LOGIN_USER,
    payload: userInfo,
  });
};
