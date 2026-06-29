import Header from "../Components/Header";
import { useEffect, useState } from "react";
import StatCard from "../Components/Cards/StatCard";
import SalesTable from "../Components/Tables/SalesTable";

function Dashboard() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("first_name");

    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/api/dashboard", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setStatistics(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching dashboard data:", error);
                setLoading(false);
            });
    }, []);

    const StatData = [
        { 
            title: "Total Products", 
            value: !statistics.total_products ? '0': statistics.total_products,
            loading: loading 
        },
        { 
            title: "Total Orders", 
            value: !statistics.total_orders ? '0': statistics.total_orders,
            loading: loading 
        },
        { 
            title: "Delivered Orders", 
            value: !statistics.delivered_orders ?'0': statistics.delivered_orders,
            loading: loading 
        },
        { 
            title: "Total Revenue", 
            value: `GHS ${ !statistics.total_revenue ? '0.00' : statistics.total_revenue}`,
            loading: loading 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                    Welcome {userName}!
                </h1>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {StatData.map((data) => (
                        <StatCard key={data.title} data={data} />
                    ))}
                </div>

                {/* Table Section */}
                <div className="mt-8 overflow-x-auto">
                    <SalesTable />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;