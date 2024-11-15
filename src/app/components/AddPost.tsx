"use client"

import prisma from "@/lib/client";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
    const { user, isLoaded } = useUser();
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<any>(null);

    if (!isLoaded) {
        return "Loading...";
    }

    const handleRemoveImage = () => {
        setImg(null); // Clear the image preview and reset state
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addPost(new FormData(event.currentTarget), img?.secure_url || "");

        // Clear form fields and image after submitting
        setDesc("");
        setImg(null);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* Avatar */}
            <Image
                src={user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-full"
            />

            {/* Post */}
            <div className="flex-1">
                {/* Text input */}
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <textarea
                        placeholder="What's on your mind?.... "
                        className="flex-1 bg-slate-100 rounded-lg p-2"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <div className="">
                        <Image src="/emoji.png" alt="" width={20} height={20} className="w-5 h-5 cursor-pointer self-end" />
                        <AddPostButton />
                    </div>
                </form>

                {/* Image Preview Section */}
                {img?.secure_url && (
                    <div className="mt-4">
                        <img
                            src={img.secure_url}
                            alt="Image Preview"
                            className="max-h-40 rounded-md mb-2"
                        />
                        <button onClick={handleRemoveImage} className="text-red-500 text-xs">
                            Remove Image
                        </button>
                    </div>
                )}

                {/* Post Options */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <CldUploadWidget
                        uploadPreset="connectify"
                        onSuccess={(result, { widget }) => {
                            if (result.info) { // Check if result.info is defined
                                setImg(result.info);
                            }
                            widget.close();
                        }}
                    >
                        {({ open }) => {
                            return(
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                                <Image src="/addimage.png" alt="" width={20} height={20} />
                                Photo
                            </div>
                        )}}
                    </CldUploadWidget>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addVideo.png" alt="" width={20} height={20} />
                        Video
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addevent.png" alt="" width={20} height={20} />
                        Event
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/poll.png" alt="" width={20} height={20} />
                        Poll
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
