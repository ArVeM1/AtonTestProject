import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios";
// Запрос на логин
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const {data} = await axios.post('/login', params)
      .catch(err => alert("Не удалось авторизироваться!"))
  localStorage.setItem("token", data.token) // сохраням token в localStorage
  return data
})
// Запрос на регистрацию
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const {data} = await axios.post('/register', params)
      .catch(err => alert("Не удалось зарегестрироваться!"))
  localStorage.setItem("token", data.token) // сохраням token в localStorage
  return data
})

const initialState = {
  data: null,
  isAuth: false,
  status: 'loading'
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.data = null;
    },
    login: (state) => {
      state.isAuth = true;
    }
  },
  extraReducers: {
    // login
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isAuth = true
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.isAuth = false
      state.status = 'error';
    },
    // Register
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isAuth = true
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  }
});

export const authRedusers = authSlice.reducer;

export const {logout, login} = authSlice.actions