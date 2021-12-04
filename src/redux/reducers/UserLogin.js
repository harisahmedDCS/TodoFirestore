import {LOGIN_USER} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_USER:
      return {userInfo: payload};
    default:
      return state;
  }
}
