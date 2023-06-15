import { loginSuccess, loginFailure } from '../redux/authSlide';
import { login } from '../api/api';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await login(email, password);
    const { token, user } = response.data;
    dispatch(loginSuccess({ token, user }));

  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error; 
  }
};
