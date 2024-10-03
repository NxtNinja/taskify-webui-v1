import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerSchema, Registerschemtype } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin, useRegister } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useCheckUsername from "@/hooks/useCheckUsername";
import useCheckEmail from "@/hooks/useCheckEmail";
import { toast } from "sonner";
import useDebounce from "@/hooks/useDebounce";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);

  const queryClient = useQueryClient();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: register_user, isPending, error, isSuccess } = useRegister();
  const { mutate: googleLogin } = useGoogleLogin();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Registerschemtype>({
    resolver: zodResolver(registerSchema),
  });

  // Fetch if email and username are taken
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const debouncedUsername = useDebounce(username, 250);
  const debouncedEmail = useDebounce(email, 250);

  const { isEmailTaken, isLoading: isCheckingEmail } =
    useCheckEmail(debouncedEmail);
  const { isTaken: isUsernameTaken, loading: isCheckingUsername } =
    useCheckUsername(debouncedUsername);

  // useEffect(() => {
  //   if (isEmailTaken) {
  //     toast.error("Email is already taken.");
  //   }
  // }, [isEmailTaken]);

  // useEffect(() => {
  //   if (isUsernameTaken) {
  //     toast.error("Username is already taken.");
  //   }
  // }, [isUsernameTaken]);

  const userRegister = async (data: Registerschemtype) => {
    // Before registering, check if email and username are available
    if (isEmailTaken || isUsernameTaken) {
      toast.error("Please use a different email or username.");
      return;
    }

    try {
      const user_data = register_user(data);
      console.log(user_data);

      if (isSuccess) {
        router.push("/auth/signin");
      }
    } catch (error) {
      toast.error("Error during registration.");
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
              onPress={googleLoginFn}
              className="flex text-sm justify-center items-center gap-3"
              color="primary"
              variant="light"
              fullWidth
              radius="sm"
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
            >
              <p className="text-foreground font-bold">Continue with Google</p>
            </Button>
            <div className="">
              <p className="text-2xl font-bold text-background">
                Create account to continue
              </p>
              <p className="text-background">Enter your details to continue</p>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit(userRegister)}>
            <CardBody className="space-y-4 flex flex-col items-end">
              <Input
                {...register("first_name")}
                placeholder="Enter Username"
                radius="sm"
                size="md"
                color="primary"
                isInvalid={errors.first_name ? true : false}
                errorMessage={errors.first_name?.message}
                onChange={(e) => setUsername(e.target.value)}
              />
              {isCheckingUsername && <p>Checking username...</p>}
              {isUsernameTaken && (
                <p className="text-red-500">Username is taken</p>
              )}

              <Input
                {...register("email")}
                placeholder="Enter Email"
                radius="sm"
                size="md"
                color="primary"
                isInvalid={errors.email ? true : false}
                errorMessage={errors.email?.message}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isCheckingEmail && <p>Checking email...</p>}
              {isEmailTaken && <p className="text-red-500">Email is taken</p>}

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
              {isEmailTaken || isUsernameTaken ? (
                <Button
                  isDisabled
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="sm"
                  className="w-fit text-background"
                  variant="flat"
                >
                  Register
                </Button>
              ) : (
                <Button
                  isLoading={isPending}
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="sm"
                  className="w-fit text-background"
                  variant="flat"
                >
                  Register
                </Button>
              )}
            </CardBody>
          </form>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-center w-full items-center gap-2">
              <div className="border-b-1 border-r-slate-200 p-1 w-full" />
              <div className="">or</div>
              <div className="border-b-1 border-r-slate-200 p-1 w-full" />
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="">Already have account?</p>
              <Link href={"/auth/signin"} className="text-foreground">
                Signin
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
