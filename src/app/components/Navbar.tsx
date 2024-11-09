import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from '@clerk/nextjs';



const Navbar =() =>{
    return(
       <div className='h-24 flex items-center justify-between'>
        {/* Left */}
        <div className="md:hidden lg:block w-[20%]">
            <Link href="/" className="font-bold text-xl "><img src="/logo.png" alt="" /></Link>
        </div>
        {/* Center */}
        <div className="hidden md:flex w-[50%] text-sm ml-10 items-center justify-between">
        {/* Links */}
        <div className="flex gap-6 text-gray-600 ">
            <Link href="/" className="flex items-center gap-2">
            <Image src="/home.png" alt="HomePage" width={16} height={16} className="w-4 h-4"/>
            <span>Homepage</span>
            </Link>

            <Link href="/" className="flex items-center gap-2">
            <Image src="/friends.png" alt="Friends" width={16} height={16} className="w-4 h-4"/>
            <span>Friends</span>
            </Link>

            <Link href="/" className="flex items-center gap-2">
            <Image src="/stories.png" alt="Stories" width={16} height={16} className="w-4 h-4"/>
            <span>stories</span>
            </Link>
        </div>
        
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
            <input type="text" placeholder="Search..." className="bg-transparent outline-none"/>
            <Image src="/search.png" alt="" width={14} height={14} />
        </div>

        </div>
        {/* Right */}
        <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end mr-4">
            
        <ClerkLoading>
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status"></div>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn><div className="flex items-center gap-4 ">
                    <div className="cursor-pointer"><Image src="/people.png" alt="" width={24} height={24} /></div>
                    <div className="cursor-pointer"><Image src="/messages.png" alt="" width={24} height={24} /></div>
                    <div className="cursor-pointer"><Image src="/notifications.png" alt="" width={24} height={24} /></div>
                    <UserButton/>
                    <MobileMenu/>
                    </div>
                    </SignedIn>

               <SignedOut><div className="flex items-center gap-2 mr-4">
                    <Image src="/login.png" alt="" width={24} height={24}/>
                    <Link href="/sign-in" >Login/Register</Link>
                    </div>
                </SignedOut>
            </ClerkLoaded>    
            
            
        </div>
       </div>
    )
}
export default Navbar;