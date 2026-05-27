import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate ,Link} from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async function () {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return toast.error(data.message);
        }

        localStorage.setItem("token", data.token);

        toast.success(data.message);

        onClose(); // close modal
        navigate("/");

      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error");
      }
    },
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* CARD (same as your login page) */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#111827",
          color: "#fff",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "75px",
              height: "75px",
              background: "linear-gradient(to right, #7c3aed, #06b6d4)",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            L
          </div>

          <h2 className="fw-bold">Welcome Back</h2>

          <p style={{ color: "#9ca3af" }}>
            Login to continue 🚀
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
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
              className="form-control form-control-lg rounded-3 border-0"
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
          </div>

          {/* PASSWORD */}
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
              className="form-control form-control-lg rounded-3 border-0"
              style={{
                background: "#1f2937",
                color: "#fff",
              }}
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="d-flex justify-content-end mb-4">
            <span
              style={{
                color: "#06b6d4",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
                <Link className="text-decoration-none" to='/forget-password'>Forgot Password?</Link>
              
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-lg w-100 fw-bold text-white rounded-3"
            style={{
              background:
                "linear-gradient(to right, #7c3aed, #06b6d4)",
              border: "none",
            }}
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        
        <div className="text-center mt-4">
          <p style={{ color: "#9ca3af" }}>
            Don&apos;t have an account?
            <span
              className="fw-bold ms-2"
              style={{
                color: "#06b6d4",
                cursor: "pointer",
              }}
            >
                <Link className="text-decoration-none" to='/register'> Register</Link>
             
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;