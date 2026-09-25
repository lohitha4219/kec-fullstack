import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="college-brand">

          <img
            src="/logo.jfif"
            alt="KEC Logo"
            className="college-logo"
          />

          <div className="college-name">
            <h2>Kuppam Engineering College</h2>
            <p>Smart Campus Management System</p>
          </div>

        </div>

        <nav className="nav-links">

          <a href="#home">Home</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/login"
            className="register-button"
          >
            Register
          </Link>

        </nav>

      </header>


      {/* HERO SECTION */}
      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="welcome-text">
            WELCOME TO
          </p>

          <h1>
            Kuppam Engineering College
          </h1>

          <h2>
            Smart Campus Management System
          </h2>

          <p className="hero-description">
            A unified digital platform connecting students,
            faculty and administration for a smarter campus
            experience.
          </p>

          <div className="hero-buttons">

            <Link
              to="/login"
              className="primary-button"
            >
              Login to Portal
            </Link>

            <a
              href="#features"
              className="secondary-button"
            >
              Explore Features
            </a>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section
        className="features"
        id="features"
      >

        <div className="section-heading">

          <p>SMART CAMPUS</p>

          <h2>Our Features</h2>

          <span>
            Everything you need in one campus platform
          </span>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🎓
            </div>

            <h3>
              Student Management
            </h3>

            <p>
              Manage student profiles, academic information
              and activities easily.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              👨‍🏫
            </div>

            <h3>
              Faculty Management
            </h3>

            <p>
              Faculty can manage academic activities and
              student information.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Attendance
            </h3>

            <p>
              Record and monitor student attendance digitally.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📚
            </div>

            <h3>
              Digital Library
            </h3>

            <p>
              Access and manage library resources through
              the campus portal.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🏠
            </div>

            <h3>
              Hostel Management
            </h3>

            <p>
              Manage hostel rooms and student accommodation
              information.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>
              Events & Activities
            </h3>

            <p>
              View and manage college events, announcements
              and activities.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section
        className="about"
        id="about"
      >

        <div className="about-image">

          <img
            src="/building.jfif"
            alt="Kuppam Engineering College"
          />

        </div>


        <div className="about-content">

          <p className="about-label">
            ABOUT KEC
          </p>

          <h2>
            Empowering Education
            <span> Through Technology</span>
          </h2>

          <p>
            Kuppam Engineering College Smart Campus
            Management System provides a centralized
            digital platform for students, faculty and
            administrators.
          </p>

          <p>
            Manage academics, attendance, library, hostel,
            events and other campus activities from one
            convenient platform.
          </p>

          <Link
            to="/login"
            className="about-button"
          >
            Access Campus Portal
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-container">


          {/* COLLEGE INFORMATION */}
          <div className="footer-column college-footer">

            <h3>
              Kuppam Engineering College
            </h3>

            <p className="footer-tagline">
              Smart Campus Management System
            </p>

            <p className="footer-description">
              A unified digital platform connecting
              students, faculty and administration for
              a smarter campus experience.
            </p>


            {/* SOCIAL ICONS */}
           <div className="social-links">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/kuppam_engineering_college/?hl=en"
    className="social-icon"
    title="Instagram"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>◎</span>
    Instagram
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/p/Kuppam-Engineering-College-100083338929107/"
    className="social-icon"
    title="Facebook"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>f</span>
    Facebook
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/channel/UCat5v1-OJMVBjw0EPiadRrw"
    className="social-icon"
    title="YouTube"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>▶</span>
    YouTube
  </a>

</div>

          </div>


          {/* QUICK LINKS */}
          <div className="footer-column">

            <h4>
              Quick Links
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#features">
              Features
            </a>

            <a href="#about">
              About KEC
            </a>

            <Link to="/login">
              Login
            </Link>

          </div>



          {/* CONTACT */}
          <div className="footer-column contact-column">

            <h4>
              Contact Us
            </h4>

            <div className="contact-item">

              <span className="contact-icon">
                📍
              </span>

              <p>
                Kuppam, Andhra Pradesh
              </p>

            </div>


            <div className="contact-item">

              <span className="contact-icon">
                ✉
              </span>

              <p>
                info@kec.edu.in
              </p>

            </div>


            <div className="contact-item">

              <span className="contact-icon">
                ☎
              </span>

              <p>
                College Administration
              </p>

            </div>


            <div className="contact-item">

              <span className="contact-icon">
                ◎
              </span>

              <p>
                Instagram: Kuppam Engineering College
              </p>

            </div>

          </div>

        </div>


        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">

          <p>
            © 2026 Kuppam Engineering College.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>

        </div>

      </footer>

    </div>
  )
}