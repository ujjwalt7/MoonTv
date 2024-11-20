import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function LoginFormSheet() {
    return ( <SheetContent className="bg-bgDark/70 backdrop-blur-xl border-l border-purple-400 h-full">
        <SheetHeader className="h-full">
        <Tabs defaultValue="account" className="w-full justify-center flex flex-col dark h-full">
  <TabsList className="justify-center w-fit mx-auto">
    <TabsTrigger value="account">Login</TabsTrigger>
    <TabsTrigger value="password">SignUp</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
        </SheetHeader>
      </SheetContent> );
}

export default LoginFormSheet;