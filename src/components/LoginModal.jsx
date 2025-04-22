import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { signInWithEmail, signUpWithEmail } from "@/lib/auth";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginModal({ open, setOpen }) {
  const [loginState, setLoginState] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useUser();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const pass = formData.get("pass");

    if (loginState) {
      const { user, error } = await signInWithEmail(email, pass, setUser);
      if (error) {
        toast({
          title: "Error Occurred",
          description: `${error}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged In",
          description: "Login was Successful",
        });
        setOpen(false);
      }
    } else {
      const { user, error } = await signUpWithEmail(email, pass, setUser);
      if (error) {
        toast({
          title: "Error Occurred",
          description: `${error}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Up",
          description: "Account created successfully",
        });
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-bgDark text-textWhite border-bgDark3">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {loginState ? "Login" : "Sign Up"} to MoonTv
          </DialogTitle>
          <DialogDescription className="text-textSec">
            Get unlimited free access to Movies and TV Shows in one place
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 bg-bgDark2 rounded-lg p-2">
              <MdEmail className="text-2xl text-textSec" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border-none bg-transparent text-textWhite"
              />
            </div>
            <div className="flex items-center space-x-2 bg-bgDark2 rounded-lg p-2">
              <MdOutlinePassword className="text-2xl text-textSec" />
              <Input
                type="password"
                name="pass"
                placeholder="Password"
                required
                className="border-none bg-transparent text-textWhite"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-textWhite text-bgDark hover:bg-textSec">
            {loginState ? "Login" : "Sign Up"}
          </Button>
          <div className="text-center text-sm text-textSec">
            {loginState ? "New to site?" : "Already a member?"}{" "}
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300"
              onClick={() => setLoginState(!loginState)}
            >
              {loginState ? "Sign Up!" : "Login"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}