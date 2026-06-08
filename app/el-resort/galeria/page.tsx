"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { useLanguage } from "@/components/providers/language-provider"

const galleryImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iu0iPxG8ula9u1bc88c7LvK8ATY9g6.png", alt: "Vista tranquila del lago con muelles flotantes", category: "lake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WmzDnK20ylubSVeFzyZFWqWFWOGWKK.png", alt: "Playa con muelle flotante", category: "lake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZUvKZ01o5y3cDfJJqlSHpItb4z33gb.png", alt: "Orilla del lago con muelle", category: "lake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jdA9WAq8jqkJyxSeEeAvLEs1lA6Q5q.png", alt: "Atardecer en la laguna", category: "lake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L7h50DVcvxu71E0cgVLYVEny0i5bQu.png", alt: "Gazebo con vista al lago", category: "resort" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HpvmlRqibRUoBuLjuNk2rWH62fKKTz.png", alt: "Terraza con cortinas y vista", category: "resort" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e19LXJMyzkUJVLI5LzFFY1HKwI80Y4.png", alt: "Área de descanso con vista", category: "resort" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zcKXOSq4EDfDy9nGfu0SDhjAio95S5.png", alt: "Jardines y terraza", category: "resort" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti4dxC5bsTuqgYv1S7TjK6WOK90BGs.png", alt: "Grupo en muelle flotante", category: "activities" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rs6ONFfvMLePkGn32hS3UDpToDUjpV.png", alt: "Escaleras a la playa con flores", category: "resort" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQa70LROzUQZ9LhHbtmkHBU5GvsL15.png", alt: "Atardecer entre palmas", category: "lake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-gcjNMPNReaz4o53yfs6FZ0Es4WHwhm.jpeg", alt: "Entrada Laguna Beach Club", category: "resort" },
]

export default function GaleriaPage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection
        title={t.galleryPage.title}
        subtitle={t.galleryPage.subtitle}
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iu0iPxG8ula9u1bc88c7LvK8ATY9g6.png"
        height="medium"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery
            images={galleryImages}
            columns={3}
            showCategories
          />
        </div>
      </section>
    </>
  )
}
