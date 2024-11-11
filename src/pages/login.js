import ImageWithFallback from "@/components/ImageFallback";
import BgLogin from "@/assets/img/BgLogin.jpg";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { signInWithEmail, signUpWithEmail } from "@/lib/auth";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
function LoginPage() {
  const [loginState, setloginState] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user) {
      console.log(user);
      router.replace("/");
    } else {
      console.log("UserNotFound");
      setLoading(false);
    }
  }, [user, setLoading, router]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const pass = formData.get("pass");
    if (loginState) {
      const { user, error, dbError } = await signInWithEmail(
        email,
        pass,
        setUser
      );
      if (error) {
        toast({
          title: "Error Ocurred",
          description: `${error}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged In",
          description: "Login was Sucessful",
        });
        router.replace("/");
      }
    } else {
      const { user, error } = await signUpWithEmail(email, pass, setUser);
      console.log(user);
      if (error) {
        toast({
          title: "Error Ocurred",
          description: `${error}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged In",
          description: "Login was Sucessful",
        });
        router.replace("/");
      }
    }
  };
  if (loading)
    return (
      <div className="w-full h-full text-textWhite font-medium flex justify-center items-center gap-2">
        Loading....
      </div>
    );
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full overflow-hidden z-0">
        <ImageWithFallback
          src={BgLogin}
          width="1920"
          height="1080"
          alt="Backdrop"
          className="w-full h-full object-cover"
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="w-full h-full absolute top-0 left-0 z-[1] flex justify-center items-center">
          <div className="w-1/3 gap-12 rounded-2xl bg-black/30 backdrop-blur-md flex flex-col justify-between py-8 px-4">
            <div className="w-full flex transition-all duration-200 flex-col justify-center px-3 items-start text-3xl font-medium text-white">
              {loginState ? "Login" : "SignUp"} to MoonTv
              <div className="text-sm">
                Get Unlimited free access to Movies and TV Show in one lace{" "}
              </div>
            </div>
            <div className="w-full flex px-4 flex-col gap-2">
              <div className="w-full gap-3 flex items-center bg-black/60 rounded-xl px-5 py-3 text-textWhite">
                <div className="text-3xl">
                  <MdEmail />
                </div>
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    required
                    id="email"
                    className="w-full text-center bg-transparent outline-none text-sm font-mono"
                  />
                </div>
              </div>
              <div className="w-full gap-3 flex items-center bg-black/60 rounded-xl px-5 py-3 text-textWhite">
                <div className="text-3xl">
                  <MdOutlinePassword />
                </div>
                <div className="w-full">
                  <input
                    required
                    type="password"
                    placeholder="password"
                    name="pass"
                    id="pass"
                    className="w-full text-center bg-transparent outline-none text-sm font-mono"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 px-2 py-3 ">
              <div className="w-full p-1 border border-textWhite rounded-xl">
                <input
                  type="submit"
                  value="submit"
                  className="w-full bg-textWhite rounded-xl flex justify-center items-center font-mono font-medium py-4 text-lg text-bgDark px-4"
                  placeholder={loginState ? "Login" : "SignUp"}
                />
              </div>
              <div className="w-full flex justify-end items-center text-sm text-textWhite">
                {loginState ? "New to site??" : "Already a Member"}{" "}
                <div
                  className="text-purple-400 font-medium px-2 text-lg cursor-pointer"
                  onClick={() => {
                    setloginState(!loginState);
                  }}
                >
                  {loginState ? "Sign Up!" : "Login"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
