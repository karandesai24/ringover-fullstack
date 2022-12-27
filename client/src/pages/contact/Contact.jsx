import "./contact.scss";
const supportInfo = [
  {
    email: "support@kicksup.com",
    text: "for any technical support",
  },
  {
    email: "info@kicksup.com",
    text: "for more information",
  },
  {
    email: "feedback@kicksup.com",
    text: "to send your feedback",
  },
  {
    email: "jobs@kicksup.com",
    text: "to work with us",
  },
];
const Contact = () => {
  return (
    <div className="contact">
      <main className="contact-container">
        <div>
          <div className="contact-details">
            <h3 className="contact-heading">Reach us at</h3>
            {supportInfo.map((item, index) => (
              <div className="support-item" key={index}>
                <h3>{item.email}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="social-links">
            <p>Stay in touch</p>
            <ul className="social-links-list">
              <li>
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="fb"
                />
              </li>
              <li>
                <img
                  src="https://img.icons8.com/fluency/48/null/instagram-new.png"
                  alt="ig"
                />
              </li>
              <li>
                <img
                  src="https://img.icons8.com/color/48/000000/twitter--v1.png"
                  alt="tw"
                />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
