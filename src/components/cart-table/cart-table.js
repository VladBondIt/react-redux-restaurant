import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../actions'
import WithRestoService from '../hoc'
import './cart-table.scss';

// Получаем итемы из редакс стора
const CartTable = ({ items, deleteFromCart }) => {
    if (items.length === 0) {
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, price, url, id, qtty } = item;

                        return (
                            <div key={id + (Math.random() * 100)} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ * {qtty}</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    );
};



// Деструктурируем из стейта, штемсы, товары которые добавляются в корзину
const mapStateToProps = ({ items }) => {
    // Ключ и значение одинаковое, значит можем записывать в один ключ ES 6
    return {
        items
    }
}

// Может не принимать Dispatch как аргумент а возвращать что то свое
const mapDispatchToProps = {
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));