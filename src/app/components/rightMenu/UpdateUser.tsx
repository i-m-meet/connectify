"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);
  const [state, formAction] = useActionState(updateProfile, { success: false, error: false });
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    if (state.success) router.refresh();
  };

  return (
    <div className="">
      <span className="text-blue-500 text-xs cursor-pointer" onClick={() => setOpen(true)}>
        Update
      </span>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50 p-2 sm:p-4 md:p-0">
          <form
            action={(formData) => formAction({ formData, cover: cover?.secure_url || user.cover || "" })}
            className="relative p-4 sm:p-6 md:p-12 bg-white rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-xl h-full sm:h-auto md:h-auto overflow-auto"
          >
            {/* Close Button */}
            <div
              className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer md:text-xl hover:text-gray-800"
              onClick={handleClose}
            >
              &times;
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-800">Update Profile</h1>
            <div className="mt-2 text-xs text-gray-500">
              Use the navbar profile to change the username or avatar.
            </div>

            {/* Cover Picture Upload */}
            <CldUploadWidget uploadPreset="connectify" onSuccess={(result) => setCover(result.info)}>
              {({ open }) => (
                <div className="flex flex-col gap-2 my-2 cursor-pointer" onClick={() => open()}>
                  <label htmlFor="cover">Cover Picture</label>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt="Cover Preview"
                      height={48}
                      width={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">Change</span>
                  </div>
                </div>
              )}
            </CldUploadWidget>

            {/* Form Fields */}
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="name" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="surname" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Brown"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="surname"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="description" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "write something about yourself"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="description"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="city" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="school" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "John"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <label htmlFor="work" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Google"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="work"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="website" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "john.linkedIn.com"}
                  className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>

            <UpdateButton />
            {state.success && <span className="text-green-500">Profile has been updated!</span>}
            {state.error && <span className="text-red-500">Something went wrong!</span>}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
