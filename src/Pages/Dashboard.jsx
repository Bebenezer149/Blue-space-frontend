/* eslint-disable react-hooks/set-state-in-effect */
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../Components/Cards/StatCard";
import SalesTable from "../Components/Tables/SalesTable";
import { API_URL } from "../config";
import { toast } from "../toast";

const getDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const getWeekRange = (daysBack) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - daysBack + index);
        return date;
    });
};

function getWeeklyTrend(orders, valueForOrder) {
    const currentWeek = getWeekRange(6);
    const previousWeek = getWeekRange(13).slice(0, 7);
    const currentValues = new Map(currentWeek.map((date) => [getDateKey(date), 0]));
    const previousValues = new Map(previousWeek.map((date) => [getDateKey(date), 0]));

    orders.forEach((order) => {
        if (!order.created_at) return;

        const value = valueForOrder(order);
        const orderKey = getDateKey(new Date(order.created_at));

        if (currentValues.has(orderKey)) currentValues.set(orderKey, currentValues.get(orderKey) + value);
        if (previousValues.has(orderKey)) previousValues.set(orderKey, previousValues.get(orderKey) + value);
    });

    const values = currentWeek.map((date) => currentValues.get(getDateKey(date)) || 0);
    const total = values.reduce((sum, value) => sum + value, 0);
    const previousTotal = [...previousValues.values()].reduce((sum, value) => sum + value, 0);
    const change = previousTotal ? ((total - previousTotal) / previousTotal) * 100 : 0;

    return {
        values,
        total,
        change,
        labels: currentWeek.map((date) => date.toLocaleDateString("en-US", { weekday: "short" })),
    };
}

function WeeklyTrendChart({ title, subtitle, trend, color, loading, formatValue }) {
    const width = 360;
    const height = 170;
    const padding = { top: 16, right: 10, bottom: 28, left: 10 };
    const maxValue = Math.max(...trend.values, 1);
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const points = trend.values.map((value, index) => {
        const x = padding.left + (chartWidth / (trend.values.length - 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
        return `${x},${y}`;
    }).join(" ");
    const chartId = title.toLowerCase().replaceAll(" ", "-");
    const isGrowing = trend.change > 0;

    return (
        <section className="surface-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isGrowing ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {isGrowing ? "+" : ""}{trend.change.toFixed(1)}%
                </span>
            </div>

            {loading ? (
                <div className="h-[170px] animate-pulse rounded-xl bg-gray-100" aria-label={`Loading ${title}`} />
            ) : (
                <>
                    <p className="mb-3 text-2xl font-bold tracking-tight text-gray-900">{formatValue(trend.total)}</p>
                    <div className="h-[170px]" role="img" aria-label={`${title}: ${formatValue(trend.total)} over the last seven days`}>
                        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id={`${chartId}-fill`} x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity="0.24" />
                                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {[0.25, 0.5, 0.75].map((level) => (
                                <line key={level} x1={padding.left} x2={width - padding.right} y1={padding.top + chartHeight * level} y2={padding.top + chartHeight * level} stroke="#e5e7eb" strokeDasharray="4 4" />
                            ))}
                            <polygon points={`${padding.left},${padding.top + chartHeight} ${points} ${width - padding.right},${padding.top + chartHeight}`} fill={`url(#${chartId}-fill)`} />
                            <polyline points={points} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                            {trend.values.map((value, index) => {
                                const [x, y] = points.split(" ")[index].split(",");
                                return <circle key={trend.labels[index]} cx={x} cy={y} r="3.5" fill="white" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />;
                            })}
                            {trend.labels.map((label, index) => (
                                <text key={label} x={padding.left + (chartWidth / (trend.labels.length - 1)) * index} y={height - 6} textAnchor="middle" fill="#6b7280" fontSize="11">{label}</text>
                            ))}
                        </svg>
                    </div>
                </>
            )}
        </section>
    );
}

function Dashboard() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("first_name");
    const slug = localStorage.getItem("slug");

    const [statistics, setStatistics] = useState({});
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const storeUrl = slug ? `${window.location.origin}/store/${encodeURIComponent(slug)}` : "";
    const storePath = slug ? `/store/${encodeURIComponent(slug)}` : "/profile";

    const copyStoreLink = async () => {
        if (!storeUrl) return;

        try {
            await navigator.clipboard.writeText(storeUrl);
            setCopied(true);
            toast.info("Store link copied to clipboard");
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Unable to copy the store link");
        }
    };

    // Fetch once when this protected dashboard mounts.
    useEffect(() => {
        setLoading(true);
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        Promise.all([
            fetch(`${API_URL}/dashboard`, { method: "GET", headers }).then((res) => res.json()),
            fetch(`${API_URL}/orders`, { method: "GET", headers }).then((res) => res.json()),
        ])
            .then(([dashboardData, ordersData]) => {
                setStatistics(dashboardData);
                setOrders(ordersData.order || []);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [token]);

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

    const revenueTrend = getWeeklyTrend(orders, (order) => Number(order.total_amount) || 0);
    const deliveryTrend = getWeeklyTrend(
        orders,
        (order) => String(order.status).toUpperCase() === "DELIVERED" ? 1 : 0,
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-in-up">
                    <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                        Welcome {userName}!
                    </h1>

                    {slug && (
                        <div className="w-full sm:w-auto sm:max-w-md">
                            <div className="flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 sm:justify-end">
                                <Link
                                    to={storePath}
                                    className="flex min-w-0 flex-1 items-center gap-2 overflow-auto px-3 py-2 text-sm text-blue-600 truncate"
                                    title="Open your store"
                                >
                                    {storeUrl}
                                </Link>
                                <div className="flex items-center justify-center px-2">
                                    <button type="button" onClick={copyStoreLink} className="text-center" aria-label="Copy store link">
                                        {copied ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4.5 text-blue-400"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-5 cursor-pointer text-blue-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-1 text-xs font-semibold text-gray-500">
                                <p>Copy the link above for advertisement</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-stagger">
                    {StatData.map((data) => (
                        <StatCard key={data.title} data={data} />
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <WeeklyTrendChart
                        title="Revenue trend"
                        subtitle="Revenue movement over the last 7 days"
                        trend={revenueTrend}
                        color="#2563eb"
                        loading={loading}
                        formatValue={(value) => new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 2 }).format(value)}
                    />
                    <WeeklyTrendChart
                        title="Delivery trend"
                        subtitle="Delivered orders over the last 7 days"
                        trend={deliveryTrend}
                        color="#16a34a"
                        loading={loading}
                        formatValue={(value) => `${value} ${value === 1 ? "delivery" : "deliveries"}`}
                    />
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
