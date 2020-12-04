const initialState = {
    menu: [],
    loading: true,
    error: false
}

const reducer = (state = initialState, action) => {
    // Стараться придерживаться метода обработки 3 состаяний по аналогии с промисами
    // успех,на время лодинга - запроса, ошибка
    switch (action.type) {
        case 'MENU_LOADED':
            // После запроса на сервер , выполнится акшон MENU_LOADED
            // после выполнения акшона записываем в стейт menu: action.payload
            return {
                menu: action.payload,
                loading: false,
                error: false
            };
        // обрабатываем стейт при загрузке данных
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