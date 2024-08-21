import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import DottedButton from "../../components/DottedButton";
import GenderCheckbox from "../../components/GenderCheckBox";
import InputWithLabel from "../../components/InputLabel";
import LoadingSpinner from "../../components/LoadingSpinner";
import TextInput from "../../components/TextInput";
import { useSignUp } from "../../hooks/useSignUp";

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
  });

  const { signup, loading } = useSignUp();

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    await signup(data);
  };

  const navigate = useNavigate();

  const handleNavigateSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="container w-full max-w-[700px] py-10 mx-auto shadow-lg rounded-lg bg-white/40 backdrop-blur-2xl">
        {/* Header */}
        <div className="px-5 flex justify-center bg-transparent ">
          <p className="font-semibold text-2xl text-indigo-500 ">Login</p>
        </div>
        <form
          className="w-full p-8 flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <Controller
              name="fullName"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Full Name:">
                    <TextInput {...field} />
                    {errors.fullName && (
                      <p className="text-red-500">
                        {typeof errors.fullName.message === "string" &&
                          errors.fullName.message}
                      </p>
                    )}
                  </InputWithLabel>
                );
              }}
            />
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Email:">
                    <TextInput {...field} />
                    {errors.email && (
                      <p className="text-red-500">
                        {typeof errors.email.message === "string" &&
                          errors.email.message}
                      </p>
                    )}
                  </InputWithLabel>
                );
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center  gap-2">
            <Controller
              name="username"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Username:">
                    <TextInput {...field} />
                    {errors.username && (
                      <p className="text-red-500">
                        {typeof errors.username.message === "string" &&
                          errors.username.message}
                      </p>
                    )}
                  </InputWithLabel>
                );
              }}
            />
            <Controller
              name="gender"
              defaultValue="male"
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Gender:">
                    <GenderCheckbox
                      onCheckboxChange={field.onChange}
                      selectedGender={field.value}
                    />
                  </InputWithLabel>
                );
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Password:">
                    <TextInput {...field} type="password" />
                    {errors.password && (
                      <p className="text-red-500">
                        {typeof errors.password.message === "string" &&
                          errors.password.message}
                      </p>
                    )}
                  </InputWithLabel>
                );
              }}
            />
            <Controller
              name="confirmPassword"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <InputWithLabel label="Confirm Password:">
                    <TextInput {...field} type="password" />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {typeof errors.confirmPassword.message === "string" &&
                          errors.confirmPassword.message}
                      </p>
                    )}
                  </InputWithLabel>
                );
              }}
            />
          </div>

          <DottedButton disabled={loading}>
            {loading ? <LoadingSpinner /> : "Register"}
          </DottedButton>
        </form>
        <div className="text-indigo-500 mx-10">
          <p>
            Already have an account?{" "}
            <span
              className="text-green cursor-pointer"
              onClick={handleNavigateSignIn}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
