function ProductCard(){
    return(
        <div className="border  border-gray-300 rounded-lg w-[360px] shadow-md">
           <div>
            <img className="object-cover rounded-t-lg h-full w-full" src="https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFnfGVufDB8fDB8fHww" alt="" />
           </div>
           <div className="p-2 px-3 flex justify-between">
                <h1 className="text-xl font-semibold">Gucci Bag</h1>
                <div className=" border py-1 px-3 rounded-full bg-green-200 text-green-500 font-semibold">
                    <h1>Available</h1>
                </div>
           </div>
           <div className="px-3 text-xl font-bold text-blue-500">
            <h1>GHS 55.00</h1>
           </div>
           <div className="border px-3 py-2 mx-3 my-3 rounded-md bg-blue-500 text-white">
            <button className="flex text-center px-24 font-semibold">Add to Cart</button>
           </div>
        </div>
    )
}
export default ProductCard