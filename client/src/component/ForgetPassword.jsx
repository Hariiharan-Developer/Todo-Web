import { useFormik } from "formik";
import { forgotPasswordSchema } from "../assets/validation";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
import {FaPaperPlane} from 'react-icons/fa'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async function handleSubmit(){
      try{
        const res = await fetch('http://localhost:8000/api/v1/user/forget-password',{
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formik.values)
        })
        const data = await res.json()
        console.log(data)
        localStorage.setItem('resetEmail',data.user.email)
        if(!res.ok){
          return toast.error(data.message)
        }
        toast.success(data.message)
        navigate('/Otp-verify')

      }catch(err){
        toast.error('Internal Server Error')
        console.log(err)
      }
    }
  });

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
      }}
    >

      {/* CARD */}
      <div
        className="card border-0 shadow-lg p-4 p-md-5 text-white"
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#111827",
          borderRadius: "16px",
        }}
      >

        {/* LOGO */}
        <div className="text-center mb-4">

          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle fw-bold"
            style={{
              width: "75px",
              height: "75px",
              background: "linear-gradient(to right, #7c3aed, #06b6d4)",
              fontSize: "28px",
            }}
          >
            F
          </div>

          <h3 className="fw-bold">Forgot Password</h3>

          <p className="text-secondary mb-0">
            Enter your registered email to receive OTP 🔐
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label text-light fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control form-control-lg border-0 text-white"
              style={{
                background: "#1f2937",
              }}
            />

            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">
                {formik.errors.email}
              </small>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              background: "linear-gradient(to right, #7c3aed, #06b6d4)",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            { formik.isSubmitting ? <FaPaperPlane style={{color:'black'}} ></FaPaperPlane> : 
            'Send OTP'}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;