import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";

const carouselData = [
  { id: 1, url: hero1, placeholder: "Sales" },
  { id: 2, url: hero2, placeholder: "Discount" },
  {
    id: 3,
    url: "https://www.shutterstock.com/shutterstock/photos/2828314497/display_1500/stock-photo-elegant-black-friday-promotional-banner-featuring-a-d-realistic-black-gift-box-wrapped-in-a-shiny-2828314497.jpg",
    placeholder: "Discount",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showSlide = useCallback((slideIndex) => {
    setCurrentSlide((slideIndex + carouselData.length) % carouselData.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % carouselData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="group relative isolate h-[280px] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-[0_18px_45px_-20px_rgba(15,23,42,0.6)] sm:h-[360px] md:h-[420px] lg:h-[480px]"
      aria-roledescription="carousel"
      aria-label="Marketplace promotions"
    >
      {carouselData.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
            index === currentSlide ? "z-10 scale-100 opacity-100" : "z-0 scale-105 opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={item.url}
            alt={item.placeholder}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/15" />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-slate-950/45 to-transparent" />

      <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-between sm:inset-x-6 sm:bottom-6">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/35 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
          <span className="tabular-nums">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="h-px w-5 bg-white/50" />
          <span className="tabular-nums text-white/70">{String(carouselData.length).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/35 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isPaused ? "Play carousel" : "Pause carousel"}
          >
            {isPaused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}
          </button>
          <button
            type="button"
            onClick={() => showSlide(currentSlide - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/35 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/35 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-30 flex h-1 w-full gap-1 px-4 sm:px-6" aria-label="Choose promotion">
        {carouselData.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => showSlide(index)}
            className="group/progress h-full flex-1 cursor-pointer bg-white/30 text-left"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`block h-full bg-white transition-all duration-500 ${index === currentSlide ? "w-full" : "w-0 group-hover/progress:w-full"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
