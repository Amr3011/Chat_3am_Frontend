import logo from '../assets/Logo.png'; 
import leftImage from '../assets/Login_photo.png'; 

const Login = () => {
  return (
    <div className="h-screen w-screen flex bg-base-100">
      <div className="flex w-full h-full">
        
        {/* Left side (Welcome message with image) */}
        <div  className="bg-primary w-1/2 h-full p-12 text-white flex flex-col justify-center items-center">
          <img src={leftImage} alt="Welcome Image" className="w-3/4 mb-8" />
          <h1 className="text-4xl font-bold mb-6 text-center">Welcome To Chat Community</h1>
          <p className="text-lg text-center">
            This website to cover all people against world to talk with each
            others
          </p>
        </div>

        {/* Right side (Login form with Logo) */}
        <div className="w-1/2 h-full p-12 relative flex flex-col justify-center">
          {/* Logo */}
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <img src={logo} alt="Logo" className="w-16" />
          </div>

          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <p className="text-sm mb-6">
            Login to access your travelwise account
          </p>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-neutral">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password
            </a>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full h-12 text-lg">Login</button>

          <div className="mt-6 text-center">
            <p>
              Don&apos;t have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
