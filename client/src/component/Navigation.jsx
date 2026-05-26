import "./navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-header">
          <h4>🔐 Auth Controller</h4>
          <small>User Management System</small>
        </div>

        <ul className="menu">

          <li className="sidebar-item active">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </li>

          <Link className="text-decoration-none" to='/register'>
          <li className="sidebar-item">
            <i className="bi bi-person-plus"></i>
            <span>Register User</span>
          </li>
          </Link>

          <Link className="text-decoration-none" to='/login'>
          <li className="sidebar-item">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </li>
          </Link>

          <Link className="text-decoration-none" to='/forget-password'>
          <li className="sidebar-item">
            <i className="bi bi-key"></i>
            <span>Forgot Password</span>
          </li>
          </Link>

          <Link className="text-decoration-none" to='reset-password'>
          <li className="sidebar-item">
            <i className="bi bi-arrow-repeat"></i>
            <span>Reset Password</span>
          </li>
          </Link>

          <Link className="text-decoration-none" to='/profile'>
          <li className="sidebar-item">
            <i className="bi bi-person-gear"></i>
            <span>User Profile</span>
          </li>
          </Link>

          
          <li className="sidebar-item">
            <i className="bi bi-shield-lock"></i>
            <span>Security Settings</span>
          </li>

          <hr />
          <Link className="text-decoration-none" to='/logout'>
          <li className="sidebar-item logout">
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </li>
          </Link>

        </ul>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* HEADER */}
        <div className="header">
          <h2>Authentication Control Panel</h2>
          <p>Manage users, sessions, and security settings in one place 🔐</p>
        </div>

        {/* INFO CARDS */}
        <div className="cards">

          <div className="card">
            <h3>128</h3>
            <p>Registered Users</p>
          </div>

          <div className="card">
            <h3>45</h3>
            <p>Active Sessions</p>
          </div>

          <div className="card">
            <h3>3</h3>
            <p>Security Alerts</p>
          </div>

        </div>

        {/* EXTRA INFO SECTION */}
        <div className="card" style={{ marginTop: "20px" }}>
          <h3>System Status</h3>
          <p>
            Authentication service is running securely. All login and session
            activities are being monitored in real-time for security protection.
          </p>
        </div>

      </main>

    </div>
  );
};

export default Navigation;