import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import { CartContext } from "../context/CartContext";
import { withRouter } from "../utils/withRouter";
import "../styles/OrderSuccess.css";

class OrderSuccessPage extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * item.qty,
      0
    );

    const orderId = Math.floor(100000 + Math.random() * 900000);

    return (
      <>
        <StoreNavbar />

        <section className="order-success">
          <div className="success-card">
            <div className="checkmark">✓</div>

            <h1>Thank you for your order</h1>
            <p className="pickup-line">
              Your style upgrade is officially on the way ✨
            </p>

            <p className="order-id">
              Order ID: <strong>#{orderId}</strong>
            </p>

            {/* ORDER SUMMARY */}
            <div className="order-summary">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <span>
                    {item.name} <small>x{item.qty}</small>
                  </span>
                  <span>{item.price}</span>
                </div>
              ))}

              <div className="order-total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="continue-shopping"
              onClick={() => this.props.navigate("/home")}
            >
              Continue Shopping →
            </button>
          </div>
        </section>

        <ProductFooter />
      </>
    );
  }
}

export default withRouter(OrderSuccessPage);
