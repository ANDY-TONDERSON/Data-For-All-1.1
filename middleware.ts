import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware "neutral": deja pasar todas las peticiones sin cambiar nada
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Si quieres que no se aplique a nada, puedes incluso comentar el matcher
export const config = {
  // matcher: [], // sin matcher no intercepta ninguna ruta
};
