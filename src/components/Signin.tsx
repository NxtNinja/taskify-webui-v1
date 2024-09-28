import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, Loginschemtype } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useGoogleLogin, useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const Signin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: login, isPending, error, isSuccess } = useLogin();
  const { mutate: googleLogin } = useGoogleLogin();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Loginschemtype>({
    resolver: zodResolver(loginSchema),
  });

  const loginUser = async (data: Loginschemtype) => {
    try {
      login(data);
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const googleLoginFn = async () => {
    googleLogin();
    queryClient.removeQueries({ queryKey: ["currentUser"] });
  };

  return (
    <>
      <div className={`grid place-items-center h-screen`}>
        <Card className="w-[450px] p-4" radius="sm">
          <CardHeader className="flex flex-col justify-start items-start gap-8">
            <Button
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              }
              onPress={googleLoginFn}
              className="flex text-sm justify-center items-center gap-3"
              color="primary"
              variant="flat"
              fullWidth
              radius="sm"
            >
              <p className="text-black">Continue with Google</p>
            </Button>
            <div className="">
              <p className="text-2xl font-bold text-background">
                Signin to continue
              </p>
              <p className="text-slate-600">
                Enter your email and password to continue
              </p>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit(loginUser)}>
            <CardBody className="space-y-4 flex flex-col items-end">
              <Input
                {...register("email")}
                placeholder="Enter Email"
                radius="sm"
                size="md"
                color="primary"
                type="email"
                isInvalid={errors.email ? true : false}
                errorMessage={errors.email?.message}
              />
              <Input
                {...register("password")}
                placeholder="Enter Password"
                radius="sm"
                size="md"
                color="primary"
                type={isVisible ? "text" : "password"}
                isInvalid={errors.password ? true : false}
                errorMessage={errors.password?.message}
                endContent={
                  <>
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? <Eye /> : <EyeOff />}
                    </button>
                  </>
                }
              />
              <Button
                isLoading={isPending}
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-fit text-black"
                variant="flat"
              >
                Sign in
              </Button>
            </CardBody>
          </form>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-center w-full items-center gap-2">
              <div className="border-b-1 border-r-slate-200 p-1 w-full" />
              <div className="">or</div>
              <div className="border-b-1 border-r-slate-200 p-1 w-full" />
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="">Don't have account?</p>
              <Link href={"/auth/register"} className="text-primary">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Signin;
