import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
// Запрос на пользователей
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page) => {
  const res = await axios.get('/users?page=' + page)
  return res.data
})
// Запрос на создание пользователя
export const fetchCreateUser = createAsyncThunk('users/fetchCreateUser', async (user) => {
  const {data} = await axios.post(`/users`, user)
  return data
})
// Запрос на удаление пользователя
export const fetchRemoveUser = createAsyncThunk('users/fetchRemoveUser', async (id) => {
  await axios.delete(`/users/${id}`)
})

const initialState = {
  users: {
    items: [],
    status: 'loading',
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    // Get Users
    [fetchUsers.pending]: (state) => {
      state.users.status = 'loading'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = 'loaded';
    },
    [fetchUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = 'error';
    },
    // Remove User
    [fetchRemoveUser.pending]: (state, action) => {
      state.users.items.data = state.users.items.data.filter(obj => obj.id !== action.meta.arg)
    },
    // Create User
    [fetchCreateUser.pending]: (state, action) => {
      state.users.items.data = state.users.items.data.append(action.payload)
    }
  }
})

export const usersRedusers = usersSlice.reducer;