import logo from '../assets/Logo.png'; 
import leftImage from '../assets/Login_photo.png'; 

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left side (Welcome message with image) */}
      <div className="flex w-full lg:w-1/2 bg-primary p-8 lg:p-12 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img src={leftImage} alt="Welcome Image" className="w-2/3 lg:w-3/4 mb-6 lg:mb-8" />
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">Welcome To Chat Community</h1>
          <p className="text-sm lg:text-lg text-center">This website to cover all people against world to talk with each others</p>
        </div>
      </div>

      {/* Right side (Register form with Logo) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        {/* Logo */}
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <img src={logo} alt="Logo" className="w-10 lg:w-16" />
        </div>

        {/* Register Form */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Register</h2>
        <p className="text-sm mb-4 lg:mb-6">Lets get you all set up so you can access your personal account.</p>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-semibold text-neutral">Full Name</label>
            <input type="text" placeholder="ex: Amr Osama" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col w-full">
            <label className="block text-sm font-semibold text-neutral">UserName</label>
            <input type="text" placeholder="ex: Amr" className="input input-bordered w-full" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-semibold text-neutral">Email</label>
            <input type="email" placeholder="example@gmail.com" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col w-full">
            <label className="block text-sm font-semibold text-neutral">Phone Number</label>
            <input type="tel" placeholder="ex: 0123456789" className="input input-bordered w-full" />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-neutral">Password</label>
          <input type="password" placeholder="Password" className="input input-bordered w-full" />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-neutral">Confirm Password</label>
          <input type="password" placeholder="Confirm Password" className="input input-bordered w-full" />
        </div>

        <label className="flex items-center mb-4">
          <input type="checkbox" className="checkbox mr-2" />
          I agree to all the Terms and Privacy Policies
        </label>

        {/* Register Button */}
        <button className="btn btn-primary w-full h-12 text-lg mb-4">Register</button>

        <div className="text-center">
          <p>Already have an Account?{" "}
            <a href="#" className="text-primary hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
