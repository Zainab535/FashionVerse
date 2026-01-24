import React, { Component } from "react";
import { CartContext } from "../context/CartContext";
import { withRouter } from "../utils/withRouter";

class CartSidebar extends Component {
  static contextType = CartContext;

  render() {
    const { cart, isOpen, increment, decrement, removeFromCart, toggleCart } = this.context;

    const total = cart.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.qty,
      0
    );

    return (
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <h3>Shopping Cart</h3>
            <span className="cart-count">{cart.length} Items</span>
          </div>
          <span className="cart-close" onClick={toggleCart}>✕</span>
        </div>

        {/* ITEMS */}
        <div className="cart-items">
          {cart.length === 0 && (
            <p className="empty-cart">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Product Image */}
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              {/* Product Info */}
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <span className="cart-item-size">Small</span>
                <div className="cart-item-price">
                  <span className="current-price">{item.price}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="cart-qty">
                <button onClick={() => decrement(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increment(item.id)}>+</button>
              </div>

              {/* Remove Button */}
              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal:</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <strong>Rs.{total.toFixed(2)}</strong>
          </div>

          <button
            className="cart-checkout-btn"
            onClick={() => {
              toggleCart();
              this.props.navigate("/checkout/shipping");
            }}
          >
            Proceed To Checkout →
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CartSidebar);

