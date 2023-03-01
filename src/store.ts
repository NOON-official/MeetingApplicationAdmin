import { configureStore } from "@reduxjs/toolkit";
import teamApi from "./features/team/api";
import user from "./features/user";
import userApi from "./features/user/api";

const store = configureStore({
  reducer: {
    user,
    [teamApi.reducerPath]: teamApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(teamApi.middleware)
      .concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
