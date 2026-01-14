import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import jesusBanner from '../../assets/jesus-banner.jpg'
import capaHome from '../../assets/capa-home.png'
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const AUTOPLAY_DELAY = 5000

  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })
  )

  const slides = [
    {
      image: jesusBanner,
      title: "Bem-vindo à IPIM",
      subtitle: "Uma igreja viva para o Deus vivo",
      action: "Saiba mais",
      actionLink: "/visit-us"
    },
    {
      image: capaHome,
      title: "Junte-se a nós",
      subtitle: "Cultos todos os domingos às 19h",
      action: "Ver programação",
      actionLink: "/calendar"
    }
  ]

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="w-full relative group"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="-ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="pl-0 relative h-[calc(100vh-80px)] min-h-[500px] w-full">
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
              <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-4 drop-shadow-lg tracking-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl font-nunito mb-8 max-w-2xl drop-shadow-md opacity-90">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-ipimGreen hover:bg-ipimGreenHover text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-0"
                asChild
              >
                <a href={slide.actionLink}>{slide.action}</a>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious className="left-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white hidden md:flex h-12 w-12 transition-all z-20" />
      <CarouselNext className="right-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white hidden md:flex h-12 w-12 transition-all z-20" />

      {/* Indicators and Progress Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-4">

        {/* Dots Indicators */}
        <div className="flex gap-3 mb-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus:outline-none",
                index + 1 === current
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar Slider */}
        <div className="w-full h-1.5 bg-white/20 overflow-hidden">
          <div
            key={current} // Reset animation on slide change
            className="h-full bg-ipimGreen w-full origin-left animate-progress group-hover:[animation-play-state:paused]"
            style={{
              animationDuration: `${AUTOPLAY_DELAY}ms`,
              animationTimingFunction: 'linear'
            }}
          />
        </div>
      </div>
    </Carousel>
  )
}
