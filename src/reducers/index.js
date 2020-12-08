const initialState = {
    menu: [],
    loading: true,
    error: false
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
                menu: action.payload,
                loading: false,
                error: false
            };
        // обрабатываем стейт во время загрузке данных
        case 'MENU_REQUESTED':
            return {
                menu: state.menu,
                loading: true,
                error: false
            };
        // обрабатываем стейт при ошибке
        case 'MENU_ERROR':
            return {
                menu: state.menu,
                loading: true,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;