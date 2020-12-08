import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequested();

        // RestoService приходит в пропсы из context Providera на самом верхнем уровне
        const { RestoService } = this.props;
        // Из метода getMenuItems возвращается промис с данными от сервера
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError());
    }

    render() {
        const { menuItems, loading, error, addedToCart } = this.props;
        if (error) {
            return <Error />
        }
        if (loading) {
            return <Spinner />
        }
        const items = menuItems.map(menuItem => {
            return (<MenuListItem
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={() => addedToCart(menuItem.id)} />
            )
        })

        return (
            <View items={items} />
        )
    }
};
// вытаскиваем свойства из глобал стейта и напрявляем их в коннект
const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

// Через диспатч связываем объект с акшонами с редюсером для изменения стейта в сторе.
const mapDispatchToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    menuError,
    addedToCart
}


const View = ({ items }) => {

    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
}

// Комопозиция компонентов высшего порядка, коннектом связываем наш компонент MenuList с редаксом
// и узываем какие данные нам нужно получить от редакса, какие стейты нам нужны и какие акшоны хотим применить.
// Таким образом меню лист получает доступ из контекста WithRestoService к сервису без property drilling`a

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));