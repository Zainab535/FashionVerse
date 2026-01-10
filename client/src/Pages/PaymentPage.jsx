import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import { CartContext } from "../context/CartContext";
import "../styles/Payment.css";
import { withRouter } from "../utils/withRouter";


class PaymentPage extends Component {
  static contextType = CartContext;

  state = {
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    saveCard: false,
    error: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

 handlePay = () => {
  const { cardNumber, expiry, cvc, name } = this.state;

  if (!cardNumber || !expiry || !cvc || !name) {
    this.setState({
      error: "Please fill all required payment fields",
    });
    return;
  }

  // ✅ Payment successful (demo)
  this.props.navigate("/order-success");
};

  render() {
    const { cart } = this.context;
    const { error } = this.state;

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * item.qty,
      0
    );

    return (
      <>
        <StoreNavbar />

        <section className="payment-page">
          {/* LEFT */}
          <div className="payment-left">
            <h2>Payment Details</h2>
            <p className="subtitle">Complete your purchase securely.</p>

            <div className="stripe-box">stripe</div>

            <label>Card Number *</label>
            <input
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              onChange={this.handleChange}
            />

            <div className="row">
              <input
                name="expiry"
                placeholder="MM / YY"
                onChange={this.handleChange}
              />
              <input
                name="cvc"
                placeholder="CVC"
                onChange={this.handleChange}
              />
            </div>

            <label>Cardholder Name *</label>
            <input
              name="name"
              placeholder="Full Name"
              onChange={this.handleChange}
            />

            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={this.state.saveCard}
                onChange={() =>
                  this.setState({ saveCard: !this.state.saveCard })
                }
              />
              <span>Save card details for future purchases</span>
            </div>

            {error && <p className="error">{error}</p>}

            <button className="pay-btn" onClick={this.handlePay}>
              Pay ${subtotal.toFixed(2)} →
            </button>

            <p className="secure-note">
              🔒 Payments are secure and encrypted with 256-bit SSL
            </p>
          </div>

          {/* RIGHT */}
          <div className="payment-right">
            <h3>Order Summary</h3>

            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>Qty: {item.qty}</p>
                </div>
                <span>{item.price}</span>
              </div>
            ))}

            <div className="summary">
              <div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div><span>Shipping</span><span>Free</span></div>
              <div><span>Taxes</span><span>$0.00</span></div>
              <div className="total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        <ProductFooter />
      </>
    );
  }
}

export default withRouter(PaymentPage);
