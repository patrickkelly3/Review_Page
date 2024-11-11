"use client";

import React, {useState} from "react";
import styles from './Home.module.css';

export default function Home () {
  const [formType, setFormType] = useState('login');

  const toggleForm = () => {
    setFormType((prevForm) => (prevForm === 'login' ? 'signup' : 'login'));
  };

  const applyGradient = (textElement: HTMLElement) => {
    const text = textElement.innerText;
    const length = text.length;
    textElement.innerText = '';

    for (let i = 0; i < length; i++) {
      const span = document.createElement('span');
      span.innerText = text[i];

      const ratio = i / (length - 1);
      const red = Math.round((1 - ratio) * 255);
      const green = Math.round((1 - ratio) * 0);
      const blue = Math.round((1 - ratio) * 0);

      span.style.color = `rgb(${red}, ${green}, ${blue})`;
      textElement.appendChild(span);
    }
  };

  React.useEffect(() => {
    const textElement = document.getElementById('gradient-text');
    if (textElement) {
      applyGradient(textElement);
    }
  }, []);

  return (
    <div className="container">
      <header className = "header">
        <h2 className="logo" id="gradient-text">
          ConnectUGA
        </h2>
        <nav className="navigation">
          <a className="link" href="contact.html">
            Contact
          </a>
          <button className="shadow__btn">Create Account</button>
        </nav>
      </header>

      <video autoPlay loop muted playsInline className="back-video">
        <source src="video.mp4" type="video/mp4" />
      </video>

      <div className="contents">
        <br />
        <br />
        <br />
        <div className="form-container">
          <p id="form-title" className="title">
            {formType === 'login' ? 'Login' : 'Sign up'}
          </p>
          <form id="auth-form" className="form">
            {formType === 'login' ? (
              <>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
                  <div className="forgot">
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
                <button className="sign" type="button">
                  Sign in
                </button>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="id-number">UGA Id#</label>
                  <input type="text" name="id-number" id="id-number" />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
                </div>
                <br />
                <button className="sign" type="button">
                  Sign up
                </button>
              </>
            )}
          </form>
          <p id="toggle-auth" className="signup">
            {formType === 'login' ? (
              <>
                Don't have an account?{' '}
                <a href="#" className="bold" onClick={toggleForm}>
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a href="#" className="bold" onClick={toggleForm}>
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <section className="space">
        <div className="card">
          <h2>Space for DAWGs to Connect!</h2>
        </div>
      </section>

      <section className="space1">
        <div className="takeAdvantageOfPeerPaws">
          <h2>Take Advantage of PeerPaws</h2>
          <br />
          <ul>
            <li>
              <i className="fa-solid fa-paw"></i>For DAWGS to help DAWGS
            </li>
            <br />
            <li>
              <i className="fa-solid fa-paw"></i>To join classes using your
              course number (CRN)
            </li>
            <br />
            <li>
              <i className="fa-solid fa-paw"></i>To connect with your friends
            </li>
            <br />
            <li>
              <i className="fa-solid fa-paw"></i>To find your friends who are
              taking the same class as you are!
            </li>
          </ul>
        </div>
        <div className="photo">
          <img src="DAWG.jpg" alt="Description of image" width="500" style={{ borderRadius: '10px' }} />
        </div>
      </section>

      <section className="image-section">
        <div className="about-container">
          <h2>About</h2>
          <p>
            At the University of Georgia, students are more than learners—they
            are leaders, innovators, and changemakers in the making. The university
            stands as a beacon of opportunity, a place where dreams are nurtured
            with the finest resources and unwavering support. With a commitment to
            excellence, UGA provides students not just with knowledge, but with the
            tools, networks, and experiences that fuel ambition and inspire action.
            Here, every challenge is an opportunity, every classroom a gateway to
            discovery, and every connection a step toward greatness. The University
            of Georgia doesn't just guide its students; it empowers them to exceed
            their own expectations, to rise beyond boundaries, and to make a
            meaningful impact on the world. UNLOCK your true potential by being a
            DAWGs!
          </p>
        </div>
        <img src="./backgroundImg.jpg" alt="Background Image" className="scroll-image" />
      </section>

      <footer className="uga-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="UGAlogo.png" alt="University of Georgia Logo" className="uga-logo" />
            <p>&copy; University of Georgia, Athens, GA 30602</p>
            <p>706-542-3000</p>
          </div>
          <div className="footer-center">
            <a href="#">Schools and Colleges</a>
            <a href="#">Directory</a>
            <a href="#">MyUGA</a>
          </div>
          <div className="footer-right">
            <a href="#">Employment Opportunities</a>
            <a href="#">Copyright and Trademarks</a>
            <a href="#">Privacy</a>
            <a href="#">Website Feedback</a>
            <a href="#">Human Trafficking Notice</a>
            <a href="#">Reporting Hotline</a>
          </div>
        </div>
        <div className="social-media">
          <a>#UGA</a>
          <a href="https://x.com/universityofga">
            <i className="fab fa-twitter" style={{ fontSize: '24px', color: 'lightskyblue' }}></i>
          </a>
          <a href="https://www.instagram.com/universityofga/">
            <i className="fab fa-instagram" style={{ fontSize: '24px', color: 'red' }}></i>
          </a>
          <a href="https://www.linkedin.com/school/university-of-georgia/posts/?feedView=all">
            <i className="fab fa-linkedin" style={{ fontSize: '24px', color: 'blue' }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
};


