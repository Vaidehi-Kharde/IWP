import React from 'react';
import Navbar from '../Components/Navbar';

export default function AboutUs() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={styles.container}>
      {/* Header Section */}
      
      <div style={styles.header}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.subtitle}>
          Your journey begins here. Let us help you discover the world in the most unforgettable way!
        </p>
      </div>

      {/* Mission Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.text}>
          We aim to provide seamless travel experiences by curating personalized packages and offering expert
          advice. Our goal is to turn every trip into a cherished memory, helping you discover new destinations
          with ease and excitement.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Tailored travel packages that suit your needs and preferences.</li>
          <li style={styles.listItem}>Expert travel consultants offering insider tips and advice.</li>
          <li style={styles.listItem}>24/7 customer support for assistance anytime, anywhere.</li>
          <li style={styles.listItem}>Over 10,000 satisfied travelers across the globe.</li>
        </ul>
      </section>

      {/* Team Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Meet the Team</h2>
        <div style={styles.team}>
          <div style={styles.teamMember}>
            <img src="aayush.jpeg" alt="Team Member 1" style={styles.teamImage} />
            <p style={styles.teamName}>Aayush Mandekar</p>
          </div>
          <div style={styles.teamMember}>
            <img src="vaidehi.jpeg" alt="Team Member 2" style={styles.teamImage} />
            <p style={styles.teamName}>Vaidehi Kharde</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <div style={styles.contact}>
          <p style={styles.text}>Got questions or need help with your bookings? Reach out to us anytime:</p>
          <ul style={styles.contactList}>
            <li><strong>Email:</strong> support@travelers.com</li>
            <li><strong>Phone:</strong> +1 (800) 123-4567</li>
            <li><strong>Address:</strong> 123 Travel Street, Suite 100, City, Country</li>
          </ul>
        </div>
      </section>

      {/* Social Media Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Follow Us</h2>
        <div style={styles.socialMedia}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <img src="https://images.hindustantimes.com/tech/img/2023/09/21/960x540/fb_1695273515215_1695273522698.jpg" alt="Facebook" style={styles.socialIcon} />
          </a>
          <a href="https://x.com/Aayus41001?t=_56Pp-fXpjqiSCWw_lc9kw&s=08" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <img src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg" alt="Twitter" style={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com/vaidehi_2311/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <img src="https://download.logo.wine/logo/Instagram/Instagram-Logo.wine.png" alt="Instagram" style={styles.socialIcon} />
          </a>
        </div>
      </section>
    </div>
    </div>
    
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    width:'100%',
    margin: 'auto',
    backgroundColor: '#f4f7fc',
    borderRadius: '5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    padding: '50px 20px',
    borderRadius: '10px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3.5rem',
    margin: '0 0 10px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '300',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '50px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#003366',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.8',
  },
  list: {
    listStyleType: 'circle',
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '10px',
  },
  team: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  teamMember: {
    textAlign: 'center',
    flexBasis: '45%',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  },
  teamMemberHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  teamImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '10px',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  teamName: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333',
  },
  contact: {
    marginTop: '20px',
  },
  contactList: {
    paddingLeft: '20px',
    fontSize: '1rem',
    color: '#555',
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  socialLink: {
    textDecoration: 'none',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  socialIconHover: {
    transform: 'scale(1.1)',
  },
};
