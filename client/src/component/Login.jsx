import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'
import { loginSchema } from '../assets/validation'
import { FaPaperPlane } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema:loginSchema,
    onSubmit: async function handleSubmit(){
      try{
         const res = await fetch('https://auth-controller.onrender.com/api/v1/user/login',{
        method:'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(values)
      })
      const data = await res.json()
      localStorage.setItem('token',data.token)
      if(!res.ok){
        return toast.error(data.message)
      }
      toast.success(data.message)
      navigate('/')
      
      }catch(err){
          toast.error('Internal Server Error')
          console.log(err)
      }

    }
  })

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #111827, #1e293b)'
      }}
    >

      {/* Login Card */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '430px',
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
              color: '#fff',
              fontSize: '28px',
              fontWeight: 'bold'
            }}
          >
            L
          </div>

          <h2 className="fw-bold">
            Welcome Back
          </h2>

          <p style={{ color: '#9ca3af' }}>
            Login to continue 🚀
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 ${
              touched.email && errors.email ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
             {touched.email && errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}

          </div>

          {/* Password */}
          <div className="mb-2">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 ${
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
              
            />
             {touched.password && errors.password && (
              <div className="invalid-feedback">
                {errors.password}
              </div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="d-flex justify-content-end mb-4">

            <span
              style={{
                color: '#06b6d4',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            ><Link className='text-decoration-none' to='/forget-password'> Forgot Password?</Link>
             
            </span>

          </div>

          {/* Remember Me */}
          <div className="form-check mb-4">

            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
            />

            <label
              className="form-check-label"
              htmlFor="remember"
              style={{ color: '#9ca3af' }}
            >
              Remember Me
            </label>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-lg w-100 fw-bold text-white rounded-3"
            style={{
              background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
              border: 'none',
              transition: '0.3s'
            }}
          >
            { isSubmitting ? <FaPaperPlane style={{color:'black'}} ></FaPaperPlane> : 
            'Login'}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-4">

          <p style={{ color: '#9ca3af' }}>
            Don&apos;t have an account?

            <span
              className="fw-bold ms-2"
              style={{
                color: '#06b6d4',
                cursor: 'pointer'
              }}
            >
              <Link className='text-decoration-none' to='/register'>Register</Link>
              
            </span>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login