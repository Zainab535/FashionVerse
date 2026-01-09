import React, { Component } from "react";
import { CartContext } from "../context/CartContext";

class CartSidebar extends Component {
  static contextType = CartContext;

  render() {
    const { cart, isOpen, increment, decrement, toggleCart } = this.context;

    const total = cart.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.qty,
      0
    );

    return (
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        
        {/* HEADER */}
        <div className="cart-header">
          <h3>Your Bag</h3>
          <span className="cart-close" onClick={toggleCart}>✕</span>
        </div>

        {/* TABLE HEAD */}
        <div className="cart-table-head">
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>

        {/* ITEMS */}
        <div className="cart-items">
          {cart.length === 0 && (
            <p className="empty-cart">Your bag is empty</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              {/* Product */}
              <div className="cart-product">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="cart-product-name">{item.name}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="cart-qty">
                <button onClick={() => decrement(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increment(item.id)}>+</button>
              </div>

              {/* Price */}
              <div className="cart-price">
                $
                {(
                  parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                  item.qty
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className="cart-actions">
            <button className="cart-secondary" onClick={toggleCart}>
              Continue Shopping
            </button>
            <button className="cart-primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSidebar;
