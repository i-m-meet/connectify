import Image from "next/image";
import Link from "next/link";

const Birthdays =() => {
    return(
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* headeing */}
            <div className=" flex items-center justify-between font-md">
                <span className="text-gray-500">Birthdays</span>
            </div>
            {/* User 1 */}
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/18940721/pexels-photo-18940721/free-photo-of-dog-sitting-under-a-tree-with-golden-autumn-leaves.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover"/>
                <span className="text-semibold ">UserName</span>
            </div>
            {/* celebrate button*/}
            <div className="flex gap-3 justify-end">
            <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">Celebrate</button>
            </div>
            </div>

            {/* upcoming birthdays */}
            <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
            <Image src="/gift.png" alt="" width={24} height={24} />
            <Link href="" className=" flex flex-col gap-1 text-xs">
            <span className="text-gray-700 font-semibold">Upcoming Birthdays</span>
            <span className="text-gray-500"> See other 16 have upcoming birthdays</span>
            </Link>
            </div>
        </div>
    )
}
export default Birthdays;