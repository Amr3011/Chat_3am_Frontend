import { useState } from "react";
import leftImg from "../../assets/Verify_photo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";

const intialState = {
  password: "",
  confirmPassword: ""
};

export default function ResetPassword() {
  const [passwordViability, setPasswordViability] = useState(false);
  const [confirmPasswordViability, setConfirmPasswordViability] =
    useState(false);
  const { restToken } = useParams();
  const navigate = useNavigate();
  const [formDate, setFormData] = useState(intialState);
  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/reset-password/${restToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDate)
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="hidden lg:flex min-h-screen w-2/3 bg-primary flex-col justify-center items-center gap-3">
          <img
            src={leftImg}
            alt="Welcome Image"
            className="w-3/6 mb-6 lg:mb-8"
          />
          <h1 className="text-2xl lg:text-4xl font-bold text-center text-base-100">
            Welcome To Chat Community
          </h1>
          <p className="text-sm lg:text-lg text-left p-5 text-base-100">
            This website to cover all people against world to talk with each
            others
          </p>
        </div>
        <div className="container p-4">
          <div className="flex flex-col justify-center items-center h-full">
            <Link
              className="link link-primary flex justify-start self-start items-center"
              to="/login"
            >
              <IoIosArrowBack className="text-primary" />
              Back to Login
            </Link>
            <div className="mb-6 self-start">
              <h1 className="text-2xl font-bold text-left capitalize">
                set new password
              </h1>
              <p className="text-xs capitalize">
                Your previous password has been rested. Please set a new
                password for your account.
              </p>
            </div>
            <form
              method="post"
              className="w-8/12 self-start flex flex-col gap-5"
              onSubmit={handleOnSubmit}
            >
              <label
                htmlFor="password"
                className="relative flex flex-col gap-3 w-full"
              >
                <span className="text-xl capitalize">new password</span>
                <div className="relative w-full">
                  <input
                    type={passwordViability ? "text" : "password"}
                    className="input input-bordered w-full"
                    name="password"
                    onChange={handleChange}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordViability((prev) => !prev)}
                  >
                    <FaRegEyeSlash />
                  </span>
                </div>
              </label>
              <label
                htmlFor="confirmPassword"
                className="relative flex flex-col gap-3 w-full"
              >
                <span className="text-xl capitalize">confirm password</span>
                <div className="relative w-full">
                  <input
                    type={confirmPasswordViability ? "text" : "password"}
                    className="input input-bordered w-full"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setConfirmPasswordViability((prev) => !prev)}
                  >
                    <FaRegEyeSlash />
                  </span>
                </div>
              </label>
              <button
                type="submit"
                className="btn btn-primary w-full capitalize"
              >
                submit
              </button>
            </form>
            <p className="text-sm my-4">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary capitalize">
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
