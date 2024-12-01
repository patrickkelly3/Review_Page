"use client";

import React, { useState } from "react";
import styles from './Home.module.css';

export default function Home() {
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.logo} id="gradient-text">
          ConnectUGA
        </h2>
        <nav className={styles.navigation}>
          <a className={styles.link} href="contact.html">
            Contact
          </a>
          <button className={styles.shadow__btn}>Create Account</button>
        </nav>
      </header>

      <video autoPlay loop muted playsInline className={styles.backVideo}>
        <source src="video.mp4" type="video/mp4" />
      </video>

      <div className={styles.contents}>
        <div className={styles.formContainer}>
          <p id="form-title" className={styles.title}>
            {formType === 'login' ? 'Login' : 'Sign up'}
          </p>
          <form id="auth-form" className={styles.form}>
            {formType === 'login' ? (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
                  <div className={styles.forgot}>
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
                <button className={styles.sign} type="button">
                  Sign in
                </button>
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="id-number">UGA Id#</label>
                  <input type="text" name="id-number" id="id-number" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
                </div>
                <button className={styles.sign} type="button">
                  Sign up
                </button>
              </>
            )}
          </form>
          <p id="toggle-auth" className={styles.signup}>
            {formType === 'login' ? (
              <>
                Don't have an account?{' '}
                <a href="#" className={styles.bold} onClick={toggleForm}>
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a href="#" className={styles.bold} onClick={toggleForm}>
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <section className={styles.space}>
        <div className={styles.card}>
          <h2>Space for DAWGs to Connect!</h2>
        </div>
      </section>

      <section className={styles.space1}>
        <div className={styles.takeAdvantageOfPeerPaws}>
          <h2>Take Advantage of PeerPaws</h2>
          <ul>
            <li>
              <i className="fa-solid fa-paw"></i>For DAWGS to help DAWGS
            </li>
            <li>
              <i className="fa-solid fa-paw"></i>To join classes using your
              course number (CRN)
            </li>
            <li>
              <i className="fa-solid fa-paw"></i>To connect with your friends
            </li>
            <li>
              <i className="fa-solid fa-paw"></i>To find your friends who are
              taking the same class as you are!
            </li>
          </ul>
        </div>
        <div className={styles.photo}>
          <img src="DAWG.jpg" alt="Description of image" width="500" />
        </div>
      </section>

      <section className={styles.imageSection}>
        <div className={styles.aboutContainer}>
          <h2>About</h2>
          <p>
            At the University of Georgia, students are more than learners—they
            are leaders, innovators, and changemakers in the making.
          </p>
        </div>
        <img src="./backgroundImg.jpg" alt="Background Image" className={styles.scrollImage} />
      </section>

      <footer className={styles.ugaFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <img src="UGAlogo.png" alt="University of Georgia Logo" className={styles.ugaLogo} />
            <p>&copy; University of Georgia, Athens, GA 30602</p>
          </div>
          <div className={styles.footerCenter}>
            <a href="#">Schools and Colleges</a>
            <a href="#">Directory</a>
            <a href="#">MyUGA</a>
          </div>
          <div className={styles.footerRight}>
            <a href="#">Employment Opportunities</a>
            <a href="#">Copyright and Trademarks</a>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <a>#UGA</a>
          <a href="https://x.com/universityofga">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/universityofga/">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/school/university-of-georgia/posts/?feedView=all">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}



