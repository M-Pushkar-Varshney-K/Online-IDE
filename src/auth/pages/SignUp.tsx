import CardWrapper from "../Components/CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SchemaSignUp } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Captcha from "@/components/Captcha";
import Otp from "./Otp";// Import the SecurityKeyInput component

type SignUpFormValues = z.infer<typeof SchemaSignUp>;

const SignUp = () => {
  const navigate = useNavigate();
  const [ShowPass, SetShowPass] = useState(false);
  const [ShowConfirm, SetShowConfirm] = useState(false);
  const [isVerified, setIsVerified] = useState<string | null>(null);
  const [showSecurityComponent, setShowSecurityComponent] = useState(false); // State to toggle security component

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SchemaSignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleCaptchaChange = (value: string | null) => {
    setIsVerified(value); // Update captcha verification status
  };

  const handleSubmit = (data: SignUpFormValues) => {
    if (!isVerified) {
      alert("Please complete the captcha");
      return;
    }

    if (data.password !== data.confirmPassword) {
      form.setError('password', {
        type: 'manual',
        message: 'Passwords must match with confirm Password',
      });
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords must match with confirm Password',
      });
      form.setValue('password', "");
      form.setValue('confirmPassword', "");
      return;
    }

    // Show the security component after form validation
    setShowSecurityComponent(true);
  };

  const handleSecuritySubmit = (key: string) => {
    // alert(`Security Key Submitted: ${key}`);
    navigate("/editor");
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full h-full">
        <CardWrapper
          label="Create your account"
          title="Sign Up"
          backButtonHref="/login"
          backButtonLabel="Already have an account? Login here."
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {!showSecurityComponent ? (
                <>
                  <div className="space-y-4">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="mpvk2787" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="mpvk@gmail.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} type={ShowPass ? "text" : "password"} placeholder="••••••••" />
                              <button
                                type="button"
                                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                                onClick={() => SetShowPass((pre) => !pre)}
                              >
                                {ShowPass ? <Eye size={20} /> : <EyeOff size={20} />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} type={ShowConfirm ? "text" : "password"} placeholder="••••••••" />
                              <button
                                type="button"
                                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                                onClick={() => SetShowConfirm((pre) => !pre)}
                              >
                                {ShowConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-500">
                      <input type="checkbox" value="remember" className="w-4 h-4" />
                      <span>Remember me</span>
                    </label>
                  </div>

                  <Captcha onChange={handleCaptchaChange} />

                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </>
              ) : (
                <Otp
                  email={form.watch("email")} // Pass the email from the form
                  onSubmit={handleSecuritySubmit} // Pass the submit handler
                />
              )}
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default SignUp;