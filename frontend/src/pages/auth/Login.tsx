import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import DottedButton from "../../components/DottedButton";
import InputWithLabel from "../../components/InputLabel";
import LoadingSpinner from "../../components/LoadingSpinner";
import TextInput from "../../components/TextInput";
import { useLogin } from "../../hooks/useLogin";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const { login, loading } = useLogin();

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const success = await login(data);

    if (success) {
      reset();
    }
  };

  const navigate = useNavigate();

  const handleNavigateSignup = () => {
    navigate("/sign-up");
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="container w-full max-w-[400px] py-10 mx-auto shadow-lg rounded-lg bg-white/80 backdrop-blur-sm">
        {/* Header */}
        <div className="px-5 flex justify-center bg-transparent ">
          <p className="font-semibold text-2xl text-indigo-500 ">Login</p>
        </div>
        <form
          className="w-full p-4 flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <DottedButton disabled={loading}>
            {loading ? <LoadingSpinner /> : "Login"}
          </DottedButton>
        </form>
        <div className="text-indigo-500 mx-6">
          <p>
            Don't have an account?{" "}
            <span
              className="text-green cursor-pointer"
              onClick={handleNavigateSignup}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
