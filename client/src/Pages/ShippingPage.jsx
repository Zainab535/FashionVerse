import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import "../styles/Shipping.css";
import { withRouter } from "../utils/withRouter";
import { CartContext } from "../context/CartContext";

class ShippingPage extends Component {
  static contextType = CartContext;

  state = {
    addresses: [],
    selectedIndex: null,
    error: "",
    form: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postal: "",
      phone: "",
    },
    billingSame: true,
  };

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
      error: "",
    });
  };

  validateForm = () => {
    const { firstName, lastName, address1, city, state, postal, phone } =
      this.state.form;

    if (
      !firstName ||
      !lastName ||
      !address1 ||
      !city ||
      !state ||
      !postal ||
      !phone
    ) {
      this.setState({
        error: "Please fill all required address fields",
      });
      return false;
    }
    return true;
  };

  addAddress = () => {
    if (!this.validateForm()) return;

    this.setState((prev) => ({
      addresses: [...prev.addresses, prev.form],
      selectedIndex: prev.addresses.length,
      form: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postal: "",
        phone: "",
      },
      error: "",
    }));
  };

  handleContinue = () => {
    const { addresses, selectedIndex } = this.state;

    if (addresses.length === 0) {
      this.setState({
        error: "Please add a shipping address before continuing",
      });
      return;
    }

    if (selectedIndex === null) {
      this.setState({
        error: "Please select a shipping address before continuing",
      });
      return;
    }

    this.props.navigate("/checkout/payment");
  };

  render() {
    const { addresses, selectedIndex, form, billingSame, error } = this.state;

    const subtotal = 835.0;
    const shipping = 20.0;
    const tax = 66.8;
    const total = subtotal + shipping + tax;

    return (
      <>
        <StoreNavbar />

        <section className="shipping-page">
          {/* LEFT */}
          <div className="shipping-left">
            <h2>Shipping Details</h2>

            {/* SAVED ADDRESSES */}
            {addresses.length > 0 && (
              <div className="saved-addresses">
                {addresses.map((addr, i) => (
                  <label
                    key={i}
                    className={`address-card ${
                      selectedIndex === i ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedIndex === i}
                      onChange={() => this.setState({ selectedIndex: i })}
                    />
                    <div>
                      <strong>
                        {addr.firstName} {addr.lastName}
                      </strong>
                      <p>{addr.address1}</p>
                      <p>
                        {addr.city}, {addr.state}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* FORM */}
            <div className="address-form">
              <h3>Add New Address</h3>

              <div className="row">
                <input
                  name="firstName"
                  placeholder="First Name *"
                  value={form.firstName}
                  onChange={this.handleChange}
                />
                <input
                  name="lastName"
                  placeholder="Last Name *"
                  value={form.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <input
                name="address1"
                placeholder="Address Line 1 *"
                value={form.address1}
                onChange={this.handleChange}
              />

              <input
                name="address2"
                placeholder="Address Line 2 (Optional)"
                value={form.address2}
                onChange={this.handleChange}
              />

              <div className="row">
                <input
                  name="city"
                  placeholder="City *"
                  value={form.city}
                  onChange={this.handleChange}
                />
                <input
                  name="state"
                  placeholder="State / Province *"
                  value={form.state}
                  onChange={this.handleChange}
                />
              </div>

              <div className="row">
                <input
                  name="postal"
                  placeholder="Postal Code *"
                  value={form.postal}
                  onChange={this.handleChange}
                />
                <input
                  name="phone"
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={this.handleChange}
                />
              </div>

              <div className="billing-check">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={() =>
                    this.setState({ billingSame: !billingSame })
                  }
                />
                <label>Billing address same as shipping</label>
              </div>

              {error && <p className="form-error">{error}</p>}

              <button className="add-address-btn" onClick={this.addAddress}>
                Add Address
              </button>

              <div
                className="return-cart"
                onClick={() => {
                  this.props.navigate(-1);
                  this.context.toggleCart();
                }}
              >
                ← Return to Cart
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="shipping-right">
            <h3>Your Order</h3>

            <div className="summary">
              <div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="continue-btn" onClick={this.handleContinue}>
              Continue to Payment →
            </button>
          </div>
        </section>

        <ProductFooter />
      </>
    );
  }
}

export default withRouter(ShippingPage);
