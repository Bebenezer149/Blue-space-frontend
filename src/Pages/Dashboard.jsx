/* eslint-disable react-hooks/set-state-in-effect */
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import StatCard from "../Components/Cards/StatCard";
import SalesTable from "../Components/Tables/SalesTable";
import { API_URL } from "../config";

function Dashboard() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("first_name");

    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch once when this protected dashboard mounts.
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/dashboard`, {
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
            value: Number(statistics.total_products) || 0,
            loading: loading 
        },
        { 
            title: "Total Orders", 
            value: Number(statistics.total_orders) || 0,
            loading: loading 
        },
        { 
            title: "Delivered Orders", 
            value: Number(statistics.delivered_orders) || 0,
            loading: loading 
        },
        { 
            title: "Total Revenue", 
            value: Number(statistics.total_revenue) || 0,
            currency: "GHS",
            loading: loading 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800 animate-fade-in-up">
                    Welcome {userName}!
                </h1>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-stagger">
                    {StatData.map((data) => (
                        <StatCard key={data.title} data={data} />
                    ))}
                </div>

                {/* Table Section */}
                <div className="mt-8 overflow-x-auto animate-fade-in-up">
                    <SalesTable />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
