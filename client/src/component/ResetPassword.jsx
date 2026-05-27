import { useFormik } from "formik";
import { updatePasswodSchema } from "../assets/validation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("resetEmail") || "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: updatePasswodSchema,

    onSubmit: async (values) => {
      try {
        const res = await fetch(
          "https://auth-controller.onrender.com/api/v1/user/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              newPassword: values.newPassword,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return toast.error(data.message);
        }

        toast.success(data.message);

        localStorage.removeItem("resetEmail");

        navigate("/login");
      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error");
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
            🔐
          </div>

          <h3 className="fw-bold">Reset Password</h3>

          <p className="text-secondary mb-0">
            Create your new secure password
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>
          {/* EMAIL (hidden UI but used internally) */}
          <input type="hidden" name="email" value={formik.values.email} />

          {/* NEW PASSWORD */}
          <div className="mb-3">
            <label className="form-label text-light fw-semibold">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control form-control-lg border-0 text-white ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "is-invalid"
                  : ""
              }`}
              style={{ background: "#1f2937" }}
            />

            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="text-danger">
                {formik.errors.newPassword}
              </small>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="form-label text-light fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control form-control-lg border-0 text-white ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              style={{ background: "#1f2937" }}
            />

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <small className="text-danger">
                  {formik.errors.confirmPassword}
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;