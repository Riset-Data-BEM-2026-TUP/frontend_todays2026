import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware proteksi rute terproteksi FE BHUMARA.
 * - /admin/*  → wajib login DAN role staf (admin/panitia). Maba diarahkan ke /portal.
 * - /portal/* → wajib login (role apa pun yang terautentikasi).
 *
 * Catatan: role dibaca dari payload JWT tanpa verifikasi tanda tangan — ini hanya
 * gating UX di edge. Otorisasi sebenarnya tetap ditegakkan backend (JwtAuthGuard +
 * RolesGuard) di setiap request API.
 */
function roleFromToken(token?: string): string | null {
  if (!token) return null;
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    return (JSON.parse(json)?.role as string) ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('session_token')?.value;

  const toLogin = () => {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(loginUrl);
  };

  // 1. Admin Panel — wajib login + role staf
  if (pathname.startsWith('/admin')) {
    if (!token) return toLogin();
    if (roleFromToken(token) === 'mahasiswa') {
      // Maba tak boleh masuk area admin → arahkan ke portalnya
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  // 2. Portal Mahasiswa — cukup wajib login
  if (pathname.startsWith('/portal')) {
    if (!token) return toLogin();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
