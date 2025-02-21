import Image from "next/image";
import SignUpForm from "./_components/SignUpForm";
import signUpGraphic from "/public/images/sign-up/Tablet login-bro (1) 1.png";
import logo from "/public/images/login/logo.png";
import { CustomImageWithBlur } from "@/components/CustomImageWithBlur/CustomImageWithBlur";

export const metadata = {
  title: "Sign Up",
  description: "Sign up page",
};

export default function SignUpPage() {
  return (
    <div className="flex-center-between w-full flex-col gap-x-20 rounded-xl border border-gray-200 p-10 shadow-[0px_0px_2px_lightGray] lg:flex-row">
      {/* Left */}
      <div className="w-full md:w-3/4 lg:w-1/2">
        <CustomImageWithBlur
          src={signUpGraphic}
          alt="Sign Up Graphic"
          height={1200}
          width={1200}
          className="mx-auto w-full md:w-3/4 lg:w-full"
        />
      </div>

      {/* Right */}
      <div className="w-full md:w-3/4 2xl:w-1/2">
        <Image src={logo} alt="logo" className="mx-auto mb-10 w-1/2" />

        <SignUpForm />
      </div>
    </div>
  );
}
