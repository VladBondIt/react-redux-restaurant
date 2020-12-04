const initialState = {
    menu: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            // После запроса на сервер , выполнится акшон MENU_LOADED
            // после выполнения акшона записываем в стейт menu: action.payload
            return {
                menu: action.payload
            }
        default:
            return state
    }
}

export default reducer;