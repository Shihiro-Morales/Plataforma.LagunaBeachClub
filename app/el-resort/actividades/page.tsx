"use client"

import { motion } from "framer-motion"
import { Sailboat, Waves, Circle, Gamepad2, BedDouble, Users } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { ActivityCard } from "@/components/cards/activity-card"
import { useLanguage } from "@/components/providers/language-provider"

export default function ActividadesPage() {
  const { t } = useLanguage()

  const activities = [
    {
      title: t.activities.kayak,
      description: t.activities.kayakDesc,
      icon: Sailboat,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Dd5JROKIOa3ULiKRjSocq4UdHQux6d.png",
    },
    {
      title: t.activities.swimming,
      description: t.activities.swimmingDesc,
      icon: Waves,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z188gWWqFc5g3O4UUqoMZlNUmDSr77.png",
    },
    {
      title: t.activities.floats,
      description: t.activities.floatsDesc,
      icon: Circle,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti4dxC5bsTuqgYv1S7TjK6WOK90BGs.png",
    },
    {
      title: t.activities.games,
      description: t.activities.gamesDesc,
      icon: Gamepad2,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-97ODSqCjW9qRQafkig3q0TjeduoQGz.png",
    },
    {
      title: t.activities.hammocks,
      description: t.activities.hammocksDesc,
      icon: BedDouble,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L7h50DVcvxu71E0cgVLYVEny0i5bQu.png",
    },
    {
      title: t.activities.commonAreas,
      description: t.activities.commonAreasDesc,
      icon: Users,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e19LXJMyzkUJVLI5LzFFY1HKwI80Y4.png",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.activities.title}
        subtitle={t.activities.subtitle}
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wRIuVlSTwVoE7jDmtunDdeE3KTgSUO.png"
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {t.activities.description}
          </motion.p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.activities.title}
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ActivityCard
                  title={activity.title}
                  description={activity.description}
                  image={activity.image}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
