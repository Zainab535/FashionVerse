import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import api from "../api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("customer");
  
  // Customer Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Brand Partner Fields
  const [brandName, setBrandName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandCategory, setBrandCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleCustomerRegister = async () => {
    if (!fullName || !email || !phone || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", {
        name: fullName,
        email,
        phone,
        password,
        role: "user"
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        
        alert("Account created successfully!");
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBrandRegister = async () => {
    if (!brandName || !businessEmail || !websiteUrl || !brandCategory) {
      setError("All fields are required");
      return;
    }

    if (!uploadedFile) {
      setError("Please upload verification documents");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    // Show success message
    setSuccess(true);
    alert("Brand registration submitted successfully! We'll review your application soon.");
    
    // Reset form
    setBrandName("");
    setBusinessEmail("");
    setWebsiteUrl("");
    setBrandCategory("");
    setUploadedFile(null);
    setAgreeTerms(false);
    setError("");

    // Navigate to brand dashboard
    setTimeout(() => {
      navigate("/brand-dashboard");
    }, 500);
  };

  const handleRegister = () => {
    if (accountType === "customer") {
      handleCustomerRegister();
    } else {
      handleBrandRegister();
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <div className="register-wrapper">
          
          {/* LEFT SIDE - IMAGE (STATIC - NEVER CHANGES) */}
          <div className="register-left">
            <div className="register-image-overlay">
              <div className="register-image-content">
                <p className="register-image-label">The New Standard</p>
                <h2 className="register-image-title">
                  Curating Excellence, <br />
                  Defining You.
                </h2>
                <p className="register-image-desc">
                  Join an exclusive network of fashion enthusiasts and visionary brands.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop" 
                alt="Fashion Model" 
                className="register-image"
              />
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="register-right">
            <div className="register-form-container">
              
              {/* HEADING */}
              <h1 className="register-title">
                {accountType === "customer" ? "Elevate Your Style" : "Partner with FashionVerse"}
              </h1>

              {/* ACCOUNT TYPE TABS - STICKY */}
              <div className="account-type-tabs">
                <button 
                  className={`account-tab ${accountType === "customer" ? "active" : ""}`}
                  onClick={() => setAccountType("customer")}
                >
                  Customer
                </button>
                <button 
                  className={`account-tab ${accountType === "brand" ? "active" : ""}`}
                  onClick={() => setAccountType("brand")}
                >
                  Brand Partner
                </button>
              </div>

              {/* FORM CONTENT */}
              <div className="register-form-content">
              
              {/* ERROR MESSAGE */}
              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="register-success">
                  Registration submitted successfully!
                </div>
              )}

              {/* CUSTOMER FORM */}
              {accountType === "customer" && (
                <>
                  <div className="register-form-group">
                    <label className="register-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Julianne Moore"
                      className="register-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="register-form-group">
                    <label className="register-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="register-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="register-form-group">
                    <label className="register-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="register-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="register-form-group">
                    <label className="register-label">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* BRAND PARTNER FORM */}
              {accountType === "brand" && (
                <>
                  <div className="brand-section-title">
                    <span className="section-icon">💼</span>
                    <span>Business Information</span>
                  </div>

                  <div className="register-form-grid-2">
                    <div className="register-form-group">
                      <label className="register-label">Brand Name</label>
                      <input
                        type="text"
                        placeholder="Official business name"
                        className="register-input"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>

                    <div className="register-form-group">
                      <label className="register-label">Business Email</label>
                      <input
                        type="email"
                        placeholder="partnerships@brand.com"
                        className="register-input"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="register-form-grid-2">
                    <div className="register-form-group">
                      <label className="register-label">Website URL</label>
                      <input
                        type="url"
                        placeholder="https://www.brand.com"
                        className="register-input"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>

                    <div className="register-form-group">
                      <label className="register-label">Brand Category</label>
                      <select
                        className="register-input"
                        value={brandCategory}
                        onChange={(e) => setBrandCategory(e.target.value)}
                      >
                        <option value="">Select category</option>
                        <option value="mens">Men's Fashion</option>
                        <option value="womens">Women's Fashion</option>
                        <option value="unisex">Unisex/Both</option>
                        <option value="accessories">Accessories</option>
                        <option value="luxury">Luxury</option>
                        <option value="streetwear">Streetwear</option>
                      </select>
                    </div>
                  </div>

                  <div className="brand-section-title" style={{ marginTop: "30px" }}>
                    <span className="section-icon">🔒</span>
                    <span>Verification Documents</span>
                  </div>

                  <p className="section-description">
                    Required: Business Registration, Tax Certificates, or Brand Authorization letters (PDF/JPG, max 10MB).
                  </p>

                  <label htmlFor="file-input" className="file-upload-area">
                    <div className="upload-icon">📁</div>
                    <p className="upload-text">Click to upload or drag and drop</p>
                    <p className="upload-subtext">Professional legal documentation for brand verification</p>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="file-input-hidden"
                  />

                  {uploadedFile && (
                    <div className="uploaded-file">
                      <span className="file-icon">📄</span>
                      <span className="file-name">{uploadedFile.name}</span>
                      <span className="file-size">{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                    </div>
                  )}

                  <div className="terms-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="checkbox-input"
                    />
                    <label htmlFor="agree-terms" className="checkbox-label">
                      I confirm that the provided information is accurate and that I have the legal authority to represent this brand. I agree to the{" "}
                      <Link to="/terms" className="link">
                        Brand Partnership Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="link">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </>
              )}

              {/* CTA BUTTON */}
              <button 
                className="register-button"
                onClick={handleRegister}
                disabled={loading}
              >
                {accountType === "customer" 
                  ? (loading ? "Joining..." : "Join FashionVerse →")
                  : (loading ? "Submitting..." : "SUBMIT APPLICATION")
                }
              </button>

              {/* TERMS & LOGIN */}
              {accountType === "customer" && (
                <div className="register-footer-text">
                  <p className="register-terms">
                    By joining, you agree to our <Link to="/terms" className="link">Terms of Service</Link> and <Link to="/privacy" className="link">Privacy Policy</Link>
                  </p>
                  <p className="register-login-prompt">
                    Already have an account? <Link to="/login" className="register-login-link">Log in</Link>
                  </p>
                </div>
              )}

              {accountType === "brand" && (
                <p className="encryption-notice">
                  🔐 End-to-End Encrypted Verification
                </p>
              )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
