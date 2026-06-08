'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const promotions = [
  {
    id: 1,
    image: '/images/promo-junio-1.png',
    alt: 'Meses de Junio - Promociones especiales'
  },
  {
    id: 2,
    image: '/images/promo-junio-2.png',
    alt: 'Día de Lujo Exclusivo - Day Pass Especial'
  },
  {
    id: 3,
    image: '/images/promo-junio-3.png',
    alt: 'Día de Lujo Exclusivo - Experiencia Premium'
  },
  {
    id: 4,
    image: '/images/promo-junio-4.png',
    alt: 'Meses de Junio - Ofertas Increíbles'
  }
]

export function PromotionalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? promotions.length - 1 : prev - 1
    )
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          {/* Carousel Container */}
          <div className="relative aspect-video md:aspect-[16/9] bg-muted">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>{currentIndex + 1} de {promotions.length}</p>
        </div>
      </div>
    </section>
  )
}
