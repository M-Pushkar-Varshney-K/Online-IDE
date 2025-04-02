import CardWrapper from "../Components/CardWrapper";
import {Form, FormControl,FormField, FormItem,FormLabel, FormMessage} from "@/components/ui/form"
import {SchemaLogin} from '../../schema/index'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from 'react-hook-form'
import {Input} from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Captcha from "@/components/Captcha";
import Otp from "./Otp";
// import Headers from "@/components/Header";

const Login = () => {
    const navigate = useNavigate();
    const[ShowPass1, SetShowPass1] = useState(false);
    const[isVerified, setIsVerified] = useState<string | null>(null);
    const [showSecurityComponent, setShowSecurityComponent] = useState(false);

    const form = useForm({
        resolver: zodResolver(SchemaLogin),
        defaultValues: {
            email:"",
            password:""
        }
    })
    const handleCaptchaChange = (value: string | null)=>{
        setIsVerified(value);
    }
    const onSubmit = (data: z.infer<typeof SchemaLogin>) =>{
        if(!isVerified){
            alert("Please fill the CAPTCHA correctly");
            return;
        }

        console.log("Login details submitted");
        console.log(data);
        navigate("/editor");
    }
    const handleSecuritySubmit = (otp: string) => {
        // alert(`OTP Submitted: ${otp}`);
        navigate("/editor");
    };
    return(
        <div>
        {/* <Headers/> */}
        <div className="w-full h-screen flex items-center justify-center">
        <CardWrapper
        label="Login to account"
        title="Login"
        backButtonHref="/signup"
        backButtonLabel ="Don't have an account? SignUp here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {!showSecurityComponent ? (
                        <>
                        <div className="space-y-4">
                        {/* Name */}
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>UserName or Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="mpvk2787@gmail.com"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        
                        {/* Password */}
                        <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} type={ShowPass1 ? "text" : "password"} placeholder="••••••••"/>
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                                            onClick={()=>SetShowPass1((pre)=>!pre)}
                                            >{ShowPass1 ? <Eye size={20}/> : <EyeOff size={20}/>}</button>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-500">
                            <input type="checkbox" value="remember" className="w-4 h-4" />
                            <span>Remember me</span>
                        </label>
                            <p className="text-blue-600 cursor-pointer" onClick={()=>setShowSecurityComponent(true)} >Forgot Password</p>
                        </div>

                    </div>

                    <Captcha onChange={handleCaptchaChange}/>
                    <Button type="submit" className="w-full">
                        Login
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
    )
}

export default Login;