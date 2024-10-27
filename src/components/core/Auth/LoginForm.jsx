import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-[#2C2C2C]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 8px rgb(44 44 44 / var(--tw-text-opacity))",
          }}
          className="w-full rounded-[0.5rem] bg-[#FDFEFE] p-[12px] text-[#2C2C2C] "
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-[#2C2C2C]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 8px rgb(44 44 44 / var(--tw-text-opacity))",
          }}
          className="w-full rounded-[0.5rem] bg-[#FDFEFE] p-[12px] pr-12 text-[#2C2C2C] "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#8E44AD" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#8E44AD" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max  text-[#613475]">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-[#E91E63] py-[8px] px-[12px] font-medium text-white"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm