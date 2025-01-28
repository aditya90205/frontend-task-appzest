import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom"; 


// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const navigate = useNavigate();

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Form submit handler
  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
    navigate("/dashboard"); // Redirect to /dashboard on successful login
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-sm">Sign in to access your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        {/* Email Field */}
        <div className="form-field">
          <label className="form-label">Email address*</label>
          <input
            placeholder="Type here"
            type="email"
            className="input max-w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label className="form-label">Password*</label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              className="input max-w-full"
              {...register("password")}
            />
          </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="form-field">
          <div className="form-control justify-between">
            <div className="flex gap-2">
              <input type="checkbox" className="checkbox" />
              <a href="#">Remember me</a>
            </div>
            <label className="form-label">
              <a
                href="#"
                className="link link-underline-hover link-primary text-sm"
              >
                Forgot your password?
              </a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="form-field">
          <div className="form-control justify-center">
            <Link to="/register" className="link link-underline-hover link-primary text-sm">
              Don&apos;t have an account yet? Sign up.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

