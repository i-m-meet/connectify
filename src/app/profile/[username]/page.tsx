import Feed from "@/app/components/feed/Feed";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import RightMenu from "@/app/components/rightMenu/RightMenu";
import UserInfoCard from "@/app/components/rightMenu/UserInfoCard";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = await params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          followings: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = auth();
  let isBlocked;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* User Profile Items */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image src={user.cover || "/noCover"} alt="" fill className="object-cover rounded-lg " />
              <Image src={user.avatar || "/noAvatar"} alt="" width={128} height={128} className=" w-32 h-32 absolute rounded-full left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover  " />
            </div>

            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {(user.name && user.surname) ? user.name + " " + user.surname : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            {/* UserInfoCard Visible Only on Small Screens */}
            <div className="block lg:hidden">
              <UserInfoCard user={user} />
            </div>
          </div>

          <Feed username={user.username} />
        </div>
      </div>
      
      {/* Right Menu with UserInfoCard Only on Large Screens */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
