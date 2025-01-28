import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom"; // React Router for navigation


// Define the validation schema using Zod
const loginSchema = z
  .object({
    email: z.string().email("Please enter a valid email."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const Registration = () => {
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
    navigate("/dashboard"); // Redirect to /dashboard on successful validation
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="text-sm">Sign up to create your new account</p>
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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label className="form-label">Password*</label>
          <input
            placeholder="Type here"
            type="password"
            className="input max-w-full"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-field">
          <label className="form-label">Confirm Password*</label>
          <input
            placeholder="Type here"
            type="password"
            className="input max-w-full"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-field pt-5">
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </div>

        {/* Sign In Link */}
        <div className="form-field">
          <div className="form-control justify-center">
            <Link
              to="/"
              className="link link-underline-hover link-primary text-sm"
            >
              Already have an account? Sign in.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;

