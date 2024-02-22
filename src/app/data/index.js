import { fetchMiddleware } from './middlewares';
import { connectionReducer, profileReducer } from './reducers';
import { Store } from './store';

export const store = new Store(
  {
    profile: profileReducer,
    connection: connectionReducer,
  },
  [fetchMiddleware]
);
