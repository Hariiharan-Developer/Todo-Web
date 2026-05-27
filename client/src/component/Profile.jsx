import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateSchema } from "../assets/validation";
import { FaPaperPlane } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },validationSchema:updateSchema,
    onSubmit: async function (){
      try{
        const res = await fetch('http://localhost:8000/api/v1/user/update',{
          method:'put',
          headers:{
            'Content-Type' :'application/json',
            'Authorization' :`Bearer ${token}`
          },
          body:JSON.stringify(formik.values)
        })
        const data = await res.json()
        if(!res.ok){
         return toast.error(data.message)
        }
        toast.success(data.message)
        navigate('/')
        
      }catch(err){
        toast.error('Internal server error')
        console.log(err.message)
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
          maxWidth: "450px",
          background: "#111827",
          borderRadius: "16px",
        }}
      >

        {/* AVATAR */}
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
            U
          </div>

          <h3 className="fw-bold">User Profile</h3>

          <p className="text-secondary mb-0">
            Update your personal information 👤
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label text-light fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
             {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">
                {formik.errors.name}
              </div>
            )}
            
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label text-light fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
             {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">
                {formik.errors.email}
              </div>
            )}
            
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="form-label text-light fw-semibold">
              Password 
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 ${
              formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
             {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">
                {formik.errors.password}
              </div>
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
          >{formik.isSubmitting ? <><FaPaperPlane style={{color:'black'}}/></> : 'Update Profile'}
            
          </button>

        </form>

      </div>
    </div>
  );
};

export default Profile;