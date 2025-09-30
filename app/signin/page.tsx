'use client'

import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignInPage(){
    const [ isSignUp, setIsSignUp] = useState(false);
    const [ email, setEmail] = useState("");
    const [password, setPassword] =  useState("");
        const [message, setMessage] =  useState("");
    const supabase = createClient();
    const router = useRouter();


   async function hadnleAuth(event: React.FormEvent) {
    event.preventDefault();

    try{
        if(isSignUp){

           const {error} = await supabase.auth.signUp({email, password});

           if (error) throw error;
           setMessage("Check your eamil for the confirmation link!")


        }else{ 

            const {error} = await supabase.auth.signInWithPassword({email, password});

           if (error) throw error;
           router.push("/dashboard")
        }

    }catch{

    }

   }




    return  (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12px-4sm:px-6 lg:px-8">
            <div  className="max-w-md w-full space-y-8">
                <div className="text-center" >
                    <h1 className="text-4ont-bold text-gray-900 mb-2" > Personalized AI Newsletter </h1>
                    <p  className="text-xl text-gray-600" > {isSignUp ? "Create your account" : "Sign In to your account"}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form className="space-y-6" onSubmit={hadnleAuth}> 
                         {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-sm text-green-600">Message: {message}</p>
              </div>
            )}
                        <div >
                        <label  htmlFor="email"
                className="block text-sm font-medium text-gray-700" > Email Address</label>
                        <input id="email" name="email"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email" required />
                        </div>

                        <div>
                        <label  htmlFor="password"
                className="block text-sm font-medium text-gray-700" > Password </label>
                        <input id="password" name="password"  type="password"  value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password" required />
                        </div>
                        <div>
                            <button className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2ocus:ring-blue-500" type="submit" >Sign In</button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <button   className="text-blue-600 hover:text-blue-500 text-sm font-medium" onClick={() => setIsSignUp((prev) => !prev)}> 
                           { isSignUp ? "Already have an account? Sign In" : " Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}