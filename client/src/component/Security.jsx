import { useFormik } from "formik";

const SecuritySettings = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          maxWidth: "450px",
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

          <h3 className="fw-bold">Security Settings</h3>

          <p className="text-secondary mb-0">
            Update your password and secure your account
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>

          {/* CURRENT PASSWORD */}
          <div className="mb-3">
            <label className="form-label text-light fw-semibold">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              className="form-control form-control-lg border-0 text-white"
              style={{ background: "#1f2937" }}
            />
          </div>

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
              className="form-control form-control-lg border-0 text-white"
              style={{ background: "#1f2937" }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="form-label text-light fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="form-control form-control-lg border-0 text-white"
              style={{ background: "#1f2937" }}
            />
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
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default SecuritySettings;