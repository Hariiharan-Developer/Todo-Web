const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ width: "300px" }}>
        
        <h5 className="mb-3 text-center">Login</h5>

        <form>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;