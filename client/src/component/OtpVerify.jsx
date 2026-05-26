import { useFormik } from 'formik'
import { otpSchema } from '../assets/validation'



const VerifyOTP = () => {


  const formik = useFormik({
    initialValues: {
      otp: ''
    },

    validationSchema: otpSchema,

    
    
  })

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow border-0 p-4 rounded-4" style={{width:'400px'}}>

        <h2 className="text-center fw-bold mb-2">
          OTP Verification
        </h2>

        <p className="text-center text-muted mb-4">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              OTP
            </label>

            <input
              type="text"
              name="otp"
              maxLength="6"
              placeholder="Enter OTP"
              className={`form-control form-control-lg text-center ${
                formik.touched.otp && formik.errors.otp
                ? 'is-invalid'
                : ''
              }`}
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {
              formik.touched.otp &&
              formik.errors.otp && (
                <div className="invalid-feedback">
                  {formik.errors.otp}
                </div>
              )
            }

          </div>

          <button className="btn btn-primary btn-lg w-100">
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  )
}

export default VerifyOTP