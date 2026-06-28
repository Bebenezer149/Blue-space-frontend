function StatCard({ data, icon: Icon, color = "blue" }) {
  // Color configurations
  const colorConfigs = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
      iconColor: "text-blue-600",
      border: "hover:border-blue-200",
      shadow: "hover:shadow-blue-100",
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      iconColor: "text-green-600",
      border: "hover:border-green-200",
      shadow: "hover:shadow-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-500",
      iconColor: "text-purple-600",
      border: "hover:border-purple-200",
      shadow: "hover:shadow-purple-100",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-500",
      iconColor: "text-red-600",
      border: "hover:border-red-200",
      shadow: "hover:shadow-red-100",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-500",
      iconColor: "text-orange-600",
      border: "hover:border-orange-200",
      shadow: "hover:shadow-orange-100",
    },
    yellow: {
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-500",
      iconColor: "text-yellow-600",
      border: "hover:border-yellow-200",
      shadow: "hover:shadow-yellow-100",
    },
    indigo: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-500",
      iconColor: "text-indigo-600",
      border: "hover:border-indigo-200",
      shadow: "hover:shadow-indigo-100",
    },
    pink: {
      bg: "bg-pink-50",
      iconBg: "bg-pink-500",
      iconColor: "text-pink-600",
      border: "hover:border-pink-200",
      shadow: "hover:shadow-pink-100",
    },
  };

  const config = colorConfigs[color] || colorConfigs.blue;

  // Format large numbers
  const formatValue = (value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value;
  };

  // Determine if value is a number
  const isNumeric = typeof data.value === 'number';

  return (
    <div className={`
      relative overflow-hidden
      border border-gray-200 
      w-full flex flex-col gap-3 
      p-6 py-8 
      rounded-xl 
      bg-white
      transition-all duration-300 
      hover:shadow-lg hover:-translate-y-1
      ${config.border} ${config.shadow}
      group
    `}>
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
      </div>

      {/* Top section with icon and subtitle */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {data.subtitle || "Total"}
          </p>
        </div>
        
        {/* Icon */}
        {Icon && (
          <div className={`
            p-2.5 rounded-lg 
            ${config.iconBg} 
            text-white
            shadow-md
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-3
          `}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Main value */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {isNumeric ? (
            <>
              {data.currency && <span className="text-lg text-gray-500 mr-1">{data.currency}</span>}
              {formatValue(data.value)}
              {data.suffix && <span className="text-lg text-gray-500 ml-1">{data.suffix}</span>}
            </>
          ) : (
            data.value
          )}
        </h1>
      </div>

      {/* Title and change indicator */}
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-sm font-medium text-gray-600">
          {data.title}
        </h2>
        
        {/* Change indicator */}
        {data.change && (
          <div className={`
            flex items-center gap-1 
            text-xs font-semibold 
            px-2 py-1 rounded-full
            ${data.change > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}
          `}>
            {data.change > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            )}
            {Math.abs(data.change)}%
          </div>
        )}
      </div>

      {/* Optional progress bar */}
      {data.progress !== undefined && (
        <div className="relative z-10 mt-1">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div 
              className={`
                h-1.5 rounded-full 
                transition-all duration-1000
                ${config.iconBg}
              `}
              style={{ width: `${Math.min(data.progress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Decorative dots */}
      <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;