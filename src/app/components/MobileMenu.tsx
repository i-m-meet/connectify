"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const handleLinkClick = (path: string) => {
        setIsOpen(false); // Close the menu
        router.push(path); // Navigate to the selected path
    };

    return (
        <div className="md:hidden">
            <div
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${
                        isOpen ? "rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                />
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${
                        isOpen ? "opacity-0" : ""
                    } ease-in-out duration-500`}
                />
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${
                        isOpen ? "-rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                />
            </div>
            {isOpen && (
                <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
                    <button onClick={() => handleLinkClick("/")}>Home</button>
                    <button onClick={() => handleLinkClick(`/profile/${user?.username || ""}`)}>My Profile</button>
                    {/* You can add more links here as needed */}
                    
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
