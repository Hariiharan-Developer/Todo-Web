import * as yup from 'yup'

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
export  const registerSchema = yup.object().shape({
  name:yup.string().required('This field this required'),
  email:yup.string().email('Enter a valid email id').required('This field is required'),
  password:yup.string().matches(passwordRegex, 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 8 characters long'),
  cpassword:yup.string().oneOf([yup.ref('password'),null], 'password should be match').required('This field is required'),
  role:yup.string().required('This field is required')
})


export const loginSchema = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: yup.string()
    .required('Password is required')
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
})

export const otpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email id")
    .required("Email is required"),

  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[0-9]+$/, "OTP must contain only numbers"),
});
export const updatePasswodSchema = yup.object({

  newPassword: yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain uppercase, lowercase, number and special character'
    ),

  confirmPassword: yup.string()
    .oneOf(
      [yup.ref('newPassword')],
      'Passwords must match'
    )
    .required('Confirm password is required')

})
//PROFILE 
export const updateSchema = yup.object().shape({
  name:yup.string().required('This field is required'),
  email:yup.string().email('Enter a vaild email addred').required('This field is required'),
  password:yup.string().matches(passwordRegex,'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 8 characters long').required('This field is required')
})
