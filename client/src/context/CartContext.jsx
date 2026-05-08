import React, { Component, createContext } from "react";

export const CartContext = createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      isOpen: false,
      userId: null,
      buyNowItem: JSON.parse(localStorage.getItem("buyNowItem")) || null
    };
  }

  componentDidMount() {
    this.loadUserCart();
    window.addEventListener('storage', this.handleStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (e) => {
    if (e.key === 'user' || e.key === 'token') {
      this.loadUserCart();
    }
  };

  loadUserCart = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const userId = user._id || user.id;
        const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        this.setState({ cart: savedCart, userId });
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        this.setState({ cart: [], userId: null });
      }
    } else {
      this.setState({ cart: [], userId: null });
    }
  };

  setBuyNowItem = (item) => {
    this.setState({ buyNowItem: item }, () => {
      if (item) {
        localStorage.setItem("buyNowItem", JSON.stringify(item));
      } else {
        localStorage.removeItem("buyNowItem");
      }
    });
  };

  clearBuyNowItem = () => {
    this.setState({ buyNowItem: null });
    localStorage.removeItem("buyNowItem");
  };

  addToCart = (product) => {
    let { userId, cart } = this.state;

    // 🔄 REFRESH USER IF MISSING (Fix for late login)
    if (!userId) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user._id || user.id;
          // Sync state and load their specific cart
          const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          this.setState({ userId, cart: savedCart });
          cart = savedCart;
        } catch (err) {
          console.error("CartContext late login error:", err);
        }
      }
    }

    if (!userId) return; // Still no user? UI alert handles it.

    const existing = cart.find((item) => item.id === product.id);
    let newCart;

    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + (product.quantity || 1) } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: product.quantity || 1 }];
    }

    this.setState({ cart: newCart }, () => {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    });
  };

  increment = (id) => {
    const { userId, cart } = this.state;
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    this.setState({ cart: newCart }, () => {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    });
  };

  decrement = (id) => {
    const { userId, cart } = this.state;
    const newCart = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    this.setState({ cart: newCart }, () => {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    });
  };

  removeFromCart = (id) => {
    const { userId, cart } = this.state;
    const newCart = cart.filter((item) => item.id !== id);
    this.setState({ cart: newCart }, () => {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    });
  };

  toggleCart = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  clearCart = () => {
    const { userId } = this.state;
    this.setState({ cart: [] });
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
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
          clearCart: this.clearCart,
          setBuyNowItem: this.setBuyNowItem,
          clearBuyNowItem: this.clearBuyNowItem,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
