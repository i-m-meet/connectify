"use client"

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({user}: {user: User}) => {

  const [open,setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);
  
  const [state,formAction] = useActionState(updateProfile, {success: false, error:false});
  
  const router = useRouter();

  const handleClose = () =>{
    setOpen(false);
    state.success && router.refresh();
  }


  

  return (
    <div className="">
      <span className="text-blue-500 text-xs cursor-pointer" onClick={()=>setOpen(true)}>Update </span>
      { open && (<div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
        <form action={(formData) => formAction({formData, cover: cover?.secure_url|| user.cover ||""} )}
        className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative">

          {/* title */}
          <h1 className="text-lg font-bold text-gray-800">Update Profile</h1>
          <div className="mt-4 text-xs text-gray-500">
            Use the navbar profile to change the username or avatar.
          </div>

        {/* cover picture upload */}
        
        <CldUploadWidget uploadPreset="connectify" onSuccess={(result) => setCover(result.info)} >
  {({ open }) => {
    return (
      <div className=" flex flex-col gap-4 my-4" onClick={()=> open()}>
      <label htmlFor="">Cover Picture</label>
      <div className="flex items-center gap-2 cursor-pointer ">
        <Image src={user.cover ||  "/noCover.png"} alt="" height={48} width={32} className="w-12 h-8 rounded-md object-cover"/>
        <span className="text-xs underline text-gray-600">Change</span>
      </div>
    </div>
    );
  }}
</CldUploadWidget>

        

        {/* wrapper */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">

        {/* firstname input */}
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">First Name</label>
            <input type="text" placeholder={user.name || "John"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="name" />
          </div>

                {/* surname input */}
        
                <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">Surname</label>
            <input type="text" placeholder={user.surname || "Brown"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="surname" />
          </div>
        

        {/* description input */}
        
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">Description</label>
            <input type="text" placeholder={user.description || "write something about yourself"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="description" />
          </div>
        

        {/* city input */}
        
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">City</label>
            <input type="text" placeholder={user.city || "New York"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="city"  />
          </div>
        

        {/* school input */}
        
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">School</label>
            <input type="text" placeholder={user.school || "John"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="school"  />
          </div>
        


        {/* work input */}
        
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">Work</label>
            <input type="text" placeholder={user.work || "Google"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="work"  />
          </div>
        

        {/* website input */}
        
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500">Website</label>
            <input type="text" placeholder={user.website || "john.linkedIn.com"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="website" />
          </div>

        </div>


        

        <UpdateButton/>
          {state.success && <span className="text-green-500">Profile has been updated! </span>}
          {state.error && <span className="text-red-500"> Something went wrong! </span>}
         <div className="absolute text-xl right-3 top-3 cursor-pointer" onClick={handleClose}>X</div>
        </form>
       
      </div>)}
      </div>
  )
}

export default UpdateUser;