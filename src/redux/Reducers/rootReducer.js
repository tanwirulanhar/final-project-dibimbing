// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
// Import reducer lainnya di sini

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  // Tambahkan reducer lainnya di sini
});

export default rootReducer;
