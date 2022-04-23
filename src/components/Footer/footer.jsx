import React from "react";
import "./footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const PageFooter = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="/#">About us</a>
              </li>
              <li>
                <a href="/#">Our services</a>
              </li>
              <li>
                <a href="/#">Privacy policy</a>
              </li>
              <li>
                <a href="/#">Affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow us</h4>
            <div className="social-links">
              <a href="/#">
                <FacebookIcon style={{ fontSize: "20px", marginTop: "10px" }} />
              </a>
              <a href="/#">
                <TwitterIcon style={{ fontSize: "20px", marginTop: "10px" }} />
              </a>
              <a href="/#">
                <InstagramIcon
                  style={{ fontSize: "20px", marginTop: "10px" }}
                />
              </a>
              <a href="/#">
                <LinkedInIcon style={{ fontSize: "20px", marginTop: "10px" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
