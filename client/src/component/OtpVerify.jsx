import { useFormik } from "formik";
import { otpSchema } from "../assets/validation";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyOTP = () => {
  const navigate = useNavigate();

  // TIMER STATE
  const [timeLeft, setTimeLeft] = useState(300);

  // TIMER EFFECT
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // CONVERT TIME
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: localStorage.getItem("resetEmail") || "",
      otp: "",
    },

    validationSchema: otpSchema,

    onSubmit: async (values) => {
      try {
        const res = await fetch(
          "https://auth-controller.onrender.com/api/v1/user/verify-OTP",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              otp: values.otp,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return toast.error(data.message);
        }

        toast.success(data.message);

        navigate("/reset-password");
      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error");
      }
    },
  });

  // RESEND OTP
  const handleResendOTP = async () => {
    try {
      const res = await fetch(
        "https://auth-controller.onrender.com/api/v1/user/resend-OTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("OTP resent successfully 📩");

      // RESET TIMER
      setTimeLeft(300);
    } catch (err) {
      console.log(err);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
      }}
    >
      <div
        className="card border-0 rounded-4 p-4 p-md-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#111827",
          color: "#fff",
        }}
      >
        {/* ICON */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "75px",
              height: "75px",
              background: "linear-gradient(to right, #7c3aed, #06b6d4)",
            }}
          >
            <ShieldCheck size={34} color="#fff" />
          </div>

          <h2 className="fw-bold">OTP Verification</h2>

          <p style={{ color: "#9ca3af" }}>
            Enter the 6-digit OTP sent to your email
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

          {/* OTP */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              OTP Code
            </label>

            <input
              type="text"
              name="otp"
              maxLength="6"
              placeholder="------"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control form-control-lg rounded-3 border-0 text-center fw-bold ${
                touched.otp && errors.otp ? "is-invalid" : ""
              }`}
              style={{
                background: "#1f2937",
                color: "#fff",
                letterSpacing: "10px",
                fontSize: "1.4rem",
              }}
            />

            {touched.otp && errors.otp && (
              <div className="invalid-feedback">
                {errors.otp}
              </div>
            )}
          </div>

          {/* TIMER */}
          <div className="text-center mb-4">
            <span
              style={{
                color: timeLeft <= 60 ? "#ef4444" : "#9ca3af",
                fontWeight: "bold",
              }}
            >
              OTP expires in {minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-lg w-100 fw-bold text-white rounded-3"
            style={{
              background:
                "linear-gradient(to right, #7c3aed, #06b6d4)",
              border: "none",
            }}
          >
            {isSubmitting ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* RESEND */}
        <div className="text-center mt-4">
          <p style={{ color: "#9ca3af" }}>
            Didn&apos;t receive the code?

            <span
              onClick={() => {
                if (timeLeft === 0) {
                  handleResendOTP();
                }
              }}
              className="fw-bold ms-2"
              style={{
                color: timeLeft > 0 ? "#6b7280" : "#06b6d4",
                cursor: timeLeft > 0 ? "not-allowed" : "pointer",
              }}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;