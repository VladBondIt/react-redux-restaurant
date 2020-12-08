const initialState = {
    menu: [],
    loading: true,
    // Итемс те элементы которые будут формироваться динамически при взоимодействии на клиента
    items: [],
    error: false,
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    // Стараться придерживаться метода обработки 3ех состаяний
    // успех, на время лодинга - запроса, ошибка.
    switch (action.type) {
        case 'MENU_LOADED':
            // После запроса на сервер,выполнится акшон MENU_LOADED
            // после выполнения акшона записываем в стейт 
            // menu: action.payload - массив с данными от сервера.
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        // обрабатываем стейт во время загрузке данных
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        // обрабатываем стейт при ошибке
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;

            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }

            }
            // товара раньше не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            }
        default:
            return state;
    }
}

export default reducer;


