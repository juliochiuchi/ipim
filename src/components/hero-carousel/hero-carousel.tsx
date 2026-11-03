import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Play } from "lucide-react"
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
import bannerDefault from '../../assets/banner-default.jpg'
import { cn } from "@/lib/utils"

type HeroSlide = {
  image?: string
  alt: string
  kicker?: string
  title?: string
  subtitle?: string
  action?: string
  actionLink?: string
  actionIcon?: React.ReactNode
  live?: boolean
}

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)
  const AUTOPLAY_DELAY = 5000

  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })
  )

  const slides: HeroSlide[] = [
    {
      alt: 'Culto Online',
      kicker: 'Ao Vivo',
      title: 'Culto Online',
      subtitle: 'Acompanhe os cultos e eventos da IPIM em tempo real, de onde você estiver.',
      action: 'Assistir ao vivo',
      actionLink: '/live',
      actionIcon: <Play className="h-4 w-4 fill-current" />,
      live: true,
    },
    {
      image: bannerDefault,
      alt: 'Banner da IPIM',
    },
    {
      image: jesusBanner,
      alt: 'Junte-se a nós',
      kicker: 'Cultos & Encontros',
      title: "Junte-se a nós",
      subtitle: "Cultos todos os domingos às 19h",
      action: "Ver programação",
      actionLink: "/calendar",
    },
  ]

  const count = slides.length

  React.useEffect(() => {
    if (!api) {
      return
    }

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
            {slide.image ? (
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : (
              <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-ipimSessionIndigo via-[#0d1330] to-zinc-950">
                <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-ipimGreen/25 blur-[120px]" />
                <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-ipimIndigoLight/25 blur-[130px]" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            )}

            <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
              {slide.kicker ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-ipimGreen",
                      slide.live && "animate-pulse"
                    )}
                  />
                  {slide.kicker}
                </div>
              ) : null}

              {slide.title ? (
                <h2 className="text-3xl tablet:text-5xl font-poppins font-bold mb-4 drop-shadow-lg tracking-tight leading-tight max-w-3xl">
                  {slide.title}
                </h2>
              ) : null}

              {slide.subtitle ? (
                <p className="text-base tablet:text-xl font-nunito mb-8 max-w-2xl drop-shadow-md opacity-90">
                  {slide.subtitle}
                </p>
              ) : null}

              {slide.action && slide.actionLink && (
                <Button
                  size="lg"
                  className="bg-ipimGreen hover:bg-ipimGreenHover text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-0"
                  asChild
                >
                  <a href={slide.actionLink} className="inline-flex items-center gap-2">
                    {slide.actionIcon}
                    {slide.action}
                  </a>
                </Button>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious className="left-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white hidden tablet:flex h-12 w-12 transition-all z-20" />
      <CarouselNext className="right-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white hidden tablet:flex h-12 w-12 transition-all z-20" />

      {/* Indicators and Progress Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-4">

        {/* Dots Indicators */}
        <div className="flex gap-3 mb-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer",
                index + 1 === current
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Ir para o slide ${index + 1}`}
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
