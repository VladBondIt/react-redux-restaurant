import { createStore } from 'redux';
import reducer from './reducers';

// Создаем глобальное хранилище с доступом у всех компонентов
const store = createStore(reducer);

export default store;