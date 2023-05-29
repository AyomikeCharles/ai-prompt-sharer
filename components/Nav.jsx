'use client'
import Link from "next/link"
import Image from "next/image"
import logo from '@public/logo.png'
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from "next/navigation"


function Nav() {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null)
    const [dropDown, setDropDown] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        const setProvider = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setProvider()
    }, [])

    const handleSignOut = () => {
        signOut()
        setDropDown(false)
        router.push('/')
    }

  return (
    <nav className="flex justify-between w-full py-4 px-10 shadow">
        <Link href='/'>
            <Image
                src={logo}
                alt='logo'
                width={40}
                height={40}
            />
        </Link>
        <div className="hidden md:flex">
            {
                session?.user?
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className="bg-blue-500 text-white hover:text-blue-900/90 hover:bg-white border p-2 rounded-full">
                        Create post
                    </Link>
                    <button type="button" onClick={signOut} className="bg-white text-blue-900/90 hover:text-white hover:bg-blue-500 transition duration-300 px-3 py-2 rounded-full">
                        Logout
                    </button>

                    <Link href='/profile' className="mt-2">
                        <Image src={session?.user.image} height={30} width={30} className="rounded-[50%]" alt="profile picture"/>
                    </Link>
                </div>
                :
                <>
                    {
                        providers && Object.values(providers).map((provider)=>(
                            <button key={provider.id}   type="button" onClick={()=>signIn(provider.id)} className="bg-white text-blue-900/90 hover:text-white hover:bg-blue-500 transition duration-300 px-3 py-2 rounded-full">
                                Sign in
                            </button>
                        ))
                    }
                </>
            }
        </div>



        {/* for mobile */}

        <div className="relative flex md:hidden ">
            {
                session?.user?
                <div className="gap-3 md:gap-5">
                    <Image src={session?.user.image} width={30} height={30} className="rounded-[50%]" alt="profile pic" onClick={()=>setDropDown(prev=>(!prev))}/>
               
                    {
                        dropDown && (
                            <div className="absolute bg-white rounded right-0 shadow w-[150px] p-2">
                                <Link href='/profile' onClick={()=>setDropDown(false)}>
                                    my profile
                                </Link>
                                <hr className="my-1"/>
                                <Link href='/create-prompt' onClick={()=>setDropDown(false)}>
                                    create prompt
                                </Link>
                                <hr className="my-1"/>
                                <button type="button" onClick={handleSignOut} className="text-white bg-blue-500 transition duration-300 px-3 py-2 my-2 rounded-full">
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
                :
                <>
                    {
                        providers && Object.values(providers).map((provider)=>(
                            <button key={provider.id}  type="button" onClick={()=>signIn(provider.id)} className="bg-white text-blue-900/90 hover:text-white hover:bg-blue-500 transition duration-300 px-3 py-2 rounded-full">
                                Sign in
                            </button>
                        ))
                    }
                </>
            }
        </div>
    </nav>
  )
}

export default Nav