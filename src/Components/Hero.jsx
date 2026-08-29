import { useState, useEffect, useCallback } from "react";
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselData = [
    {
      id: 1,
      url:hero1,
      placeholder: "Sales",
    },
    {
      id: 2,
      url:hero2 ,
      placeholder: "discount",
    },
     {
      id: 3,
      url: "https://www.shutterstock.com/shutterstock/photos/2828314497/display_1500/stock-photo-elegant-black-friday-promotional-banner-featuring-a-d-realistic-black-gift-box-wrapped-in-a-shiny-2828314497.jpg",
      placeholder: "discount",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  }, [carouselData.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative rounded-lg w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {carouselData.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.url}
            alt={item.placeholder}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        
        </div>
      ))}
      
   
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white w-4" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;