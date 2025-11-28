"use client"

import React, { useRef } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import TrackingSection from "@/components/tracking-section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Versión RESUMIDA de la guía solo para la página de inicio
const homeSteps = [
  {
    number: 1,
    title: "Define tu caso",
    description: "Identifica si lo tuyo es denuncia, queja o petición para usar la vía correcta.",
  },
  {
    number: 2,
    title: "Reúne la información básica",
    description: "Anota fecha, lugar, dependencia y una descripción clara de lo que ocurrió.",
  },
  {
    number: 3,
    title: "Protege tus datos",
    description: "Decide si quieres denunciar con tus datos o de forma anónima, según el canal.",
  },
  {
    number: 4,
    title: "Elige la plataforma adecuada",
    description: "Según el tipo de caso, usa la plataforma oficial que te sugerimos en Data For All.",
  },
  {
    number: 5,
    title: "Guarda tu folio",
    description: "Después de enviar, conserva tu folio para poder rastrear el avance de tu caso.",
  },
]

export default function Home() {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const amount = 320 // píxeles a desplazar por clic
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Sección de rastreo directo (para el botón "Rastrear mi Petición") */}
      <TrackingSection />

      {/* Guía resumida en formato carrusel */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-foreground mb-3 text-center md:text-left">
                ¿Cómo se realiza una denuncia?
              </h2>
              <p className="text-secondary text-sm md:text-base text-center md:text-left">
                Antes de iniciar, revisa estos pasos rápidos para presentar tu denuncia, queja
                o petición y darle mejor seguimiento a tu folio.
              </p>
            </div>

            {/* Botones para mover el carrusel en pantallas medianas en adelante */}
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollCarousel("left")}
                aria-label="Ver paso anterior"
              >
                ‹
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollCarousel("right")}
                aria-label="Ver siguiente paso"
              >
                ›
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent"
            >
              {homeSteps.map((step) => (
                <Card
                  key={step.number}
                  className="min-w-[260px] max-w-xs md:min-w-[280px] snap-center p-5 bg-white shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                      {step.number}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-secondary leading-snug">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Botones también visibles en móvil, debajo del carrusel */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollCarousel("left")}
              aria-label="Ver paso anterior"
            >
              ‹
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollCarousel("right")}
              aria-label="Ver siguiente paso"
            >
              ›
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
