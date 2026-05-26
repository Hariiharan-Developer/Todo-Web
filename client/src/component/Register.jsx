import { useFormik } from 'formik'
import { registerSchema } from '../assets/validation'

const Register = () => {

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
      role: ''
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #111827, #1e293b)'
      }}
    >

      <div
        className="card border-0 shadow-lg p-4 p-md-5 rounded-4"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#111827',
          color: '#fff',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)'
        }}
      >

        {/* Logo */}
        <div className="text-center mb-4">

          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '75px',
              height: '75px',
              background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            R
          </div>

          <h2 className="fw-bold">
            Create Account
          </h2>

          <p style={{ color: '#9ca3af' }}>
            Welcome back! Please register to continue
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
              className={`form-control form-control-lg rounded-3 border-0 ${
                errors.name && touched.name
                  ? 'is-invalid'
                  : ''
              }`}
              style={{
                background: '#1f2937',
                color: '#fff'
              }}
            />

            {
              errors.name && touched.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )
            }

          </div>

          {/* Email */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className={`form-control form-control-lg rounded-3 border-0 ${
                errors.email && touched.email
                  ? 'is-invalid'
                  : ''
              }`}
              style={{
                background: '#1f2937',
                color: '#fff'
              }}
            />

            {
              errors.email && touched.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )
            }

          </div>

          {/* Password */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Create password"
              className={`form-control form-control-lg rounded-3 border-0 ${
                errors.password && touched.password
                  ? 'is-invalid'
                  : ''
              }`}
              style={{
                background: '#1f2937',
                color: '#fff'
              }}
            />

            {
              errors.password && touched.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )
            }

          </div>

          {/* Confirm Password */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="cpassword"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
              className={`form-control form-control-lg rounded-3 border-0 ${
                errors.cpassword && touched.cpassword
                  ? 'is-invalid'
                  : ''
              }`}
              style={{
                background: '#1f2937',
                color: '#fff'
              }}
            />

            {
              errors.cpassword && touched.cpassword && (
                <div className="invalid-feedback">
                  {errors.cpassword}
                </div>
              )
            }

          </div>

          {/* Role */}
          <div className="mb-4">

            <label className="form-label fw-semibold">
              Select Role
            </label>

            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-select form-select-lg rounded-3 border-0 ${
                errors.role && touched.role
                  ? 'is-invalid'
                  : ''
              }`}
              style={{
                background: '#1f2937',
                color: '#fff'
              }}
            >
              <option value="">Choose role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {
              errors.role && touched.role && (
                <div className="invalid-feedback">
                  {errors.role}
                </div>
              )
            }

          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-lg w-100 fw-bold rounded-3 text-white"
            style={{
              background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
              border: 'none',
              transition: '0.3s'
            }}
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-4">

          <p style={{ color: '#9ca3af' }}>
            Already have an account?

            <span
              className="fw-bold ms-2"
              style={{
                color: '#06b6d4',
                cursor: 'pointer'
              }}
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register