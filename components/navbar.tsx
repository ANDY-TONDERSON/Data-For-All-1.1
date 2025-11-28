"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    href: "/donde-denuncio",
    label: "¿Dónde Denuncio?",
  },
  {
    href: "/rastrear",
    label: "Rastrear",
  },
  {
    href: "/guia",
    label: "Guía",
  },
  {
    href: "/datos-abiertos",
    label: "Datos Abiertos",
  },
  {
    href: "/programas", // <- nuevo botón negro
    label: "Programas sociales",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo / Marca */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold tracking-tight text-primary">
            DATA FOR ALL
          </span>
          <span className="text-xs text-muted-foreground">
            Datos abiertos. Puertas abiertas.
          </span>
        </Link>

        {/* Links del menú (los textos negros del centro) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-foreground hover:text-primary transition-colors",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón derecho: antes era Admin, ahora Inicio de sesión */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin" // misma ruta de antes, solo cambia el texto
            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
          >
            Inicio de sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}
