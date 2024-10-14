import { useState } from "react";
import leftImg from "../../assets/forgot-password.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

const intialState = {
  username: ""
};

export default function ForgotPassword() {
  const [formDate, setFormData] = useState(intialState);
  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/forgot-password", {
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
          <h1 className="text-2xl lg:text-4xl font-bold text-center">
            Welcome To Chat Community
          </h1>
          <p className="text-sm lg:text-lg text-left p-5">
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
                forgot your password?
              </h1>
              <p className="text-xs capitalize">
                Don&apos;t worry, happens to all of us. Enter your email below
                to recover your password.
              </p>
            </div>
            <form
              method="post"
              className="w-8/12 self-start flex flex-col gap-5"
              onSubmit={handleOnSubmit}
            >
              <label htmlFor="username" className="flex flex-col gap-3 w-full">
                <span className="text-xl">Email</span>
                <input
                  placeholder="example@gmail.com"
                  type="text"
                  className="input input-bordered w-full"
                  name="username"
                  onChange={handleChange}
                />
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
