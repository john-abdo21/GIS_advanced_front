import { configureStore } from '@reduxjs/toolkit';

import filterReducer from '../features/filter/FilterSlice';
import dataReqReducer from '../features/filter/DataReducer';
import stateReqReducer from '../features/filter/StateReducer';
import optionReducer from '../features/filter/OptionReducer';
import showReducer from '../features/filter/ShowReducer';
import ComplexOptionReducer from '../features/filter/ComplexOptionReducer';


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    data: dataReqReducer,
    rootdata: stateReqReducer,
    options: optionReducer,
    show: showReducer,
    complex: ComplexOptionReducer
  },
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;