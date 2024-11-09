import Image from "next/image";

const Comments = () =>{
    return(
        <div className="">
            {/* Write box */}
            <div className="flex items-center gap-4">
            <Image src="https://images.pexels.com/photos/18518659/pexels-photo-18518659/free-photo-of-redhead-in-red-turtleneck-sweater.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={32} height={32} className="w-8 h-8 rounded-full"/>
            <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
                <input type="text" placeholder="Write a comment..." className="bg-transparent outline-none flex-1"/>
                <Image src="/emoji.png" alt="" width={16} height={16} className="cursor-pointer"/>
            </div>
            </div>

            {/* Comment display */}
            <div className="">
                {/* comment */}
                <div className="flex gap-4 justify-between mt-6">
                {/* Avatar */}
                <Image src="https://images.pexels.com/photos/18518659/pexels-photo-18518659/free-photo-of-redhead-in-red-turtleneck-sweater.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full flex-1"/>
                {/* Description */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium ">Sumeet</span>
                    <p className="bg-slate-100 rounded-xl px-2 py-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic enim laboriosam pariatur sunt eos, repellendus voluptatum facere dolore temporibus non.</p>
                    <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                       <div className="flex items-center gap-4">
                       <Image  src="/like.png" alt="" width={12} height={12} className="cursor-pointer w-4 h-4"/>
                       <span className="text-gray-300"> |</span>
                       <span className="text-gray-500"> 99 Likes</span>
                       </div> 
                       <div className="">Reply</div>
                    </div>
                </div>
                {/* Icon */}
                <Image  src="/more.png" alt="" width={16} height={16} className="cursor-pointer w-4 h-4"/>
            </div>
            </div>
        </div>
    )
}

export default Comments;