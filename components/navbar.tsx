"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    href: "/orientador",
    label: "¿Dónde Denuncio?",
  },
  {
    href: "/denuncias",
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
    href: "/programas",
    label: "Programas sociales",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detectar sesión (cookies + localStorage)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasLocal = window.localStorage.getItem("dfa_logged_in") === "1";

    const cookies = typeof document !== "undefined" ? document.cookie : "";
    const hasCookie = cookies.includes("auth-token=");

    setIsLoggedIn(hasLocal || hasCookie);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dfa_logged_in");
      window.localStorage.removeItem("dfa_user_email");
    }

    const expire = (name: string) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    };

    expire("auth-token");
    expire("user-email");
    expire("user-name");
    expire("user-role");

    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo / Marca (esto también sirve como "volver al inicio" sin cerrar sesión) */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold tracking-tight text-primary">
            DATA FOR ALL
          </span>
          <span className="text-xs text-muted-foreground">
            Datos abiertos. Puertas abiertas.
          </span>
        </Link>

        {/* Links del menú */}
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

        {/* Lado derecho: botones según sesión */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Ir al panel admin */}
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
              >
                Ir al panel
              </Link>

              {/* Cerrar sesión */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
            >
              Inicio de sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
