function StatCard({data}){
    return(
        <div className="border border-gray-200 w-full  flex flex-col gap-4 p-4 bg-slate-50 py-10 rounded-lg items-center">
            <h1 className="font-semibold text-xl">
                {data.title}
            </h1>

           <h1 className="font-semibold text-lg text-gray-600">{data.value}</h1>
        </div>
    )
}
export default StatCard