import logo from '../assets/Logo.png'; 
import leftImage from '../assets/Verify_photo.png'; 

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left side (Welcome message with image) */}
      <div className="flex w-full lg:w-1/2 bg-primary p-8 lg:p-12 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img src={leftImage} alt="Welcome Image" className="w-1/2 lg:w-1/3 mb-6 lg:mb-8" />
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">Welcome To Chat Community</h1>
          <p className="text-sm lg:text-lg text-center">This website to cover all people against world to talk with each others</p>
        </div>
      </div>

      {/* Right side (Verify code form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        {/* Logo */}
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <img src={logo} alt="Logo" className="w-10 lg:w-16" />
        </div>

        {/* Back to Register link */}
        <a href="#" className="text-sm text-primary hover:underline mb-4">&lt; Back to Register</a>

        {/* Form */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Verify code</h2>
        <p className="text-sm mb-4 lg:mb-6">An authentication code has been sent to your email.</p>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-neutral">Enter Code</label>
          <input type="text" placeholder="Enter the code" className="input input-bordered w-full" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <a href="#" className="text-sm text-primary hover:underline">Didn&apos;t receive a code? Resend</a>
        </div>

        {/* Verify Button */}
        <button className="btn btn-primary w-full h-12 text-lg mb-4">Verify</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
