import { useFormik } from "formik";
import { forgotPasswordSchema } from "../assets/validation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: forgotPasswordSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          "https://auth-controller.onrender.com/api/v1/user/forget-password",
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

        // ✅ SAFE: use form value instead of backend response
        localStorage.setItem("resetEmail", values.email);

        toast.success(data.message);

        navigate("/Otp-verify");
      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4 p-md-5 text-white"
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#111827",
          borderRadius: "16px",
        }}
      >
        {/* HEADER */}
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
            disabled={formik.isSubmitting}
            className="btn w-100 fw-bold text-white"
            style={{
              background:
                "linear-gradient(to right, #7c3aed, #06b6d4)",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {formik.isSubmitting ? (
              <div className="spinner-border spinner-border-sm text-light"></div>
            ) : (
              <>
                <FaPaperPlane className="me-2" />
                Send OTP
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;