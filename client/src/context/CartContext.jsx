import React, { Component, createContext } from "react";

export const CartContext = createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    // 🔥 LOAD CART FROM LOCALSTORAGE
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    this.state = {
      cart: savedCart,
      isOpen: false,
    };
  }

  // 🔥 SAVE CART TO LOCALSTORAGE (AFTER EVERY UPDATE)
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify(this.state.cart)
      );
    }
  }

  addToCart = (product) => {
    const existing = this.state.cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      this.setState({
        cart: this.state.cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      });
    } else {
      this.setState({
        cart: [...this.state.cart, { ...product, qty: 1 }],
      });
    }
  };

  increment = (id) => {
    this.setState({
      cart: this.state.cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      ),
    });
  };

  decrement = (id) => {
    this.setState({
      cart: this.state.cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0),
    });
  };

  removeFromCart = (id) => {
    this.setState({
      cart: this.state.cart.filter((item) => item.id !== id),
    });
  };

  toggleCart = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeFromCart: this.removeFromCart,
          toggleCart: this.toggleCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
