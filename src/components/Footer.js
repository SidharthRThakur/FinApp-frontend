// src/components/Footer.js

import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Expense Tracker- S.Thakur. All rights
        reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px",
    marginTop: "30px",
    color: "#888",
    fontSize: "14px",
  },
};

export default Footer;
