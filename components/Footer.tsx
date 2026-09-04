import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-watermark">VGN</div>

      <div className="footer-main">
        <div className="footer-col">
          <h4 className="footer-heading">CUSTOMER SERVICE</h4>
          <p className="footer-email">Email: support@vgnlab.com</p>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-discord"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">VGN</h4>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">V HUB</a>
            </li>
            <li>
              <a href="#">User Manual</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">VGN Affiliate Program</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">SUPPORT</h4>
          <ul className="footer-links">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Shipping Policy</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms Of Service</a>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-col-wide">
          <h4 className="footer-heading">STAY CONNECTED WITH US!</h4>
          <p className="footer-text">
            Join us on social media &amp; subscribe to our emails to stay up to
            date with the latest news, product releases and exciting
            developments.
          </p>
          <NewsletterForm
            className="footer-newsletter"
            placeholder="enter your email addr"
            buttonLabel="SUBMIT"
            source="footer"
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          @2025 VGN | Gaming Mechanical Keyboards And Gaming Mice
        </p>
        <div className="payment-methods">
          <span className="pay-card visa">VISA</span>
          <span className="pay-card mc"></span>
          <span className="pay-card amex">AMEX</span>
          <span className="pay-card apple-pay">
            <i className="fa-brands fa-apple"></i> Pay
          </span>
          <span className="pay-card paypal">
            <i className="fa-brands fa-paypal"></i>
          </span>
          <span className="pay-card jcb">JCB</span>
          <span className="pay-card gpay">
            <i className="fa-brands fa-google"></i> Pay
          </span>
        </div>
      </div>
    </footer>
  );
}
