import Image from "next/image";

const Ads =({size}:{size: "sm" | "md" | "lg"}) => {
    return(
        <div className="p-4 bg-white rounded-lg shadow-md text-sm">
            {/* Top  */}
            <div className="flex  items-center justify-between text-gray-500 font-medium">
            <span>Sponsored Ad</span>
            <Image src="/more.png" alt="" width={16} height={16}/>
            </div>
            {/* Bottom */}
            <div className={` flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
                <div className={`relative w-full ${size=== "sm" ? "h-24" : size=== "md" ? "h-36" :  "h-48"}`}>
                <Image src="https://images.pexels.com/photos/28689135/pexels-photo-28689135/free-photo-of-vibrant-dahlias-arranged-on-wooden-surface.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" fill className=" rounded-lg object-cover"/>
                </div>
                <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/28689135/pexels-photo-28689135/free-photo-of-vibrant-dahlias-arranged-on-wooden-surface.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={24} height={24} className=" rounded-full w-6 h-6 object-cover"/>
                <span className="text-blue-500 font-medium"> Exotic Flowers</span>
                </div>
                <p className={size=== "sm" ? "text-xs" : "text-sm"}>
                   {size==="sm" ? "Explore the beauty of exotic flowers and discover the unique charm of each bloom." : size=== "md" ? "Explore the beauty of exotic flowers and discover the unique charm of each bloom.Lorem ipsem anything else you want to see here." : " Explore the beauty of exotic flowers and discover the unique charm of each bloom. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia hic, corrupti voluptatibus"  } 
                    </p>
                <button className="bg-gray-200 text-gray-500 rounded-lg text-xs p-2">Learn More</button>
            </div>
        </div>
    )
}
export default Ads;