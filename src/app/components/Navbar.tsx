"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the User type to match the structure of the search results
type User = {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
};

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [allResults, setAllResults] = useState<User[]>([]);
    const [filteredResults, setFilteredResults] = useState<User[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    // Fetch all possible matches from the API
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            setDropdownVisible(false);  
            return;
        }

        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/searchUsers?query=${searchQuery.toLowerCase()}`);
                if (res.ok) {
                    const data: User[] = await res.json();  
                    setAllResults(data);
                    setDropdownVisible(true);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchResults();
    }, [searchQuery]);

    // Filter results on the client side to ensure case insensitivity
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            setDropdownVisible(false);  
        } else {
            const filtered = allResults.filter(user =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredResults(filtered);
            setDropdownVisible(true);
        }
    }, [allResults, searchQuery]);

    // Redirect to the profile page if username matches
    const handleSelectUser = (username: string) => {
        router.push(`/profile/${username}`);
        setSearchQuery("");
        setFilteredResults([]);  // Clear results after selection
        setDropdownVisible(false);
    };

    return (
        <div className="h-24 flex items-center justify-between">
            {/* Left */}
            <div className="md:hidden lg:block w-[20%]">
                <Link href="/" className="font-bold text-xl"><img src="/logo.png" alt="" /></Link>
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
                
                {/* Search Box */}
                <div className="relative hidden xl:flex items-center w-64"> {/* Set a fixed width here */}
                    <div className="p-2 bg-slate-100 flex items-center rounded-xl w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Image src="/search.png" alt="" width={14} height={14} />
                    </div>

                    {/* Search Results Dropdown */}
                    {isDropdownVisible && filteredResults.length > 0 && (
                        <div className="absolute top-full mt-1 left-0 bg-white border rounded-md w-full shadow-md z-10 max-h-48 overflow-y-auto">
                            {filteredResults.slice(0, 8).map((user) => ( 
                                <div
                                    key={user.id}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectUser(user.username)}
                                >
                                    <Image
                                        src={user.avatar || "/noAvatar.png"}
                                        alt={`${user.username}'s avatar`}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                                        {user.name && <p className="text-xs text-gray-500">{user.name}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Right */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end mr-4">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status"></div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="flex items-center gap-4 ">
                            <div className="cursor-pointer"><Image src="/people.png" alt="" width={24} height={24} /></div>
                            <div className="cursor-pointer"><Image src="/messages.png" alt="" width={24} height={24} /></div>
                            <div className="cursor-pointer"><Image src="/notifications.png" alt="" width={24} height={24} /></div>
                            <UserButton/>
                            <MobileMenu/>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 mr-4">
                            <Image src="/login.png" alt="" width={24} height={24}/>
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>    
            </div>
        </div>
    );
};

export default Navbar;
