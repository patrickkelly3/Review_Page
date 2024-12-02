import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./Contact.module.css"; // Import CSS module styles

const Header = () => {
  const router = useRouter(); // Next.js router hook

  return (
    <header className={styles.header}>
      <h2 className={styles.logo} id="gradient-text">ConnectUGA</h2>
      <nav className={styles.navigation}>
        <button
          className={styles.link}
          onClick={() => router.push("/")} // Navigate to the home page
        >
          Home
        </button>
        <button className={styles.link}>Login</button>
      </nav>
    </header>
  );
};

const ContactForm = () => (
  <form className={styles.contactForm} action="mailto:rk89352@uga.edu" method="post">
    <label className={styles.contactFormLabel} htmlFor="fname">Name:</label>
    <input className={styles.contactFormInput} type="text" id="fname" name="fname" /><br /><br />
    <label className={styles.contactFormLabel} htmlFor="email">Email:</label>
    <input className={styles.contactFormInput} type="email" id="email" name="email" /><br /><br />
    <label className={styles.contactFormLabel} htmlFor="Message">Message:</label><br /><br />
    <textarea className={styles.contactFormTextarea} id="Message" name="Message" rows="15" cols="80"></textarea><br /><br />
    <input className={styles.contactFormSubmit} type="submit" value="Submit" />
  </form>
);

const ContactSection = () => (
  <section className={styles.section}>
    <div className={styles.oneCol}>
      <h1>Contact UGA</h1>
      <p>
        University of Georgia Chapel, Herty Dr &nbsp;&nbsp;|&nbsp;&nbsp; Athens, Georgia 2024 &nbsp;&nbsp;|&nbsp;&nbsp;
        (706) 542-3000 &nbsp;&nbsp;|&nbsp;&nbsp; reghelp@uga.edu
      </p>
      <hr />
      <br /><br />
      <ContactForm />
    </div>
  </section>
);

const Contact = () => (
  <div className={styles.app}>
    <div className={styles.videoContainer}>
      <video autoPlay loop muted playsInline className={styles.backVideo}>
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
    <Header />
    <ContactSection />
  </div>
);

export default Contact;
