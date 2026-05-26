import { useFormik } from "formik";

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
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
              className="form-control form-control-lg border-0 text-white"
              style={{ background: "#1f2937" }}
            />
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
              className="form-control form-control-lg border-0 text-white"
              style={{ background: "#1f2937" }}
            />
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="form-label text-light fw-semibold">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formik.values.phone}
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
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
};

export default Profile;