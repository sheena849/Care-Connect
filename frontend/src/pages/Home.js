import Navbar from '../components/Navbar';  // Import Navbar

const Home = () => {
  return (
    <div className="home-container">
      
      <div className="home-content">
        <h1 className="home-heading">Welcome to CareConnect</h1>
        <p className="home-description">
          Your trusted platform for managing patient care and appointments.
        </p>

        <div className="features">
          <div className="feature-card">
            <h2>Manage Patients</h2>
            <p>Keep track of all patient information efficiently and securely.</p>
          </div>

          <div className="feature-card">
            <h2>Appointment Scheduling</h2>
            <p>Book and manage appointments with ease for your patients.</p>
          </div>

          <div className="feature-card">
            <h2>Reports & Insights</h2>
            <p>Get detailed reports and insights to improve patient care.</p>
          </div>
        </div>

        <div className="cta-button-container">
          <button className="cta-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
