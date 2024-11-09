import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const ProfileCard =async ()=> {
    const {userId} = auth();
    if(!userId) return null;


    const user = await prisma.user.findFirst({
        where:{
            id: userId,
        },
        include:{
            _count:{
                select:{
                    followers: true
                }
            }
        }
    });
    console.log(user)
    if (!user) return null;

    return(
            <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
              {/* profile picture */}
              <div className="h-20 relative">
                <Image src={user.cover || "/noCover.png"} alt="" fill className="rounded-md object-cover"/>

                <Image src={user.avatar || "/noAvatar.png"} alt=""  width={48} height={48} className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"/>
                </div>  
                {/* username  */}
                <div className="flex flex-col h-20 gap-2 items-center">
                    <span className="font-semibold">{(user.name && user.surname)? user.name + " " + user.surname: user.username}</span>
                    <div className="flex items-center gap-4">
                        <div className="flex">
                        <Image src="https://images.pexels.com/photos/18093590/pexels-photo-18093590/free-photo-of-anglo-nubian-goats-standing-in-field.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""  width={12} height={12} className="rounded-full w-3 h-3  object-cover"/>

                        <Image src="https://images.pexels.com/photos/26692187/pexels-photo-26692187/free-photo-of-portrait-of-woman-posing-in-blue-suit.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""  width={12} height={12} className="rounded-full w-3 h-3  object-cover"/>

                        <Image src="https://images.pexels.com/photos/27958424/pexels-photo-27958424/free-photo-of-portrait-of-smiling-woman-in-dress-standing-among-yellow-flowers.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""  width={12} height={12} className="rounded-full w-3 h-3  object-cover"/>
                        </div>
                        <span className="text-xs text-gray-500">{user._count.followers}</span>
                    </div>
                    <button className="bg-blue-500 text-white text-xs p-2 rounded-md"> My Profile</button>
                </div>

            </div>
    )
}

export default ProfileCard;