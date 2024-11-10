import { useRouter } from "next/router";
import { useEffect } from "react";

function Explore() {
    const router = useRouter();
    useEffect(() => {
      router.replace('/')
    }, [router])
    
    return ( <div className="w-full h-full text-xl font-medium text-textWhite flex justify-center items-center" >Redirecting to home...</div> );
}

export default Explore;