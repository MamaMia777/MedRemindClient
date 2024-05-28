import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('MED_REMIND_AUTHORIZATION_COOKIE')
  if (tokenCookie){
    return NextResponse.rewrite(new URL('/', request.url))
  } else {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
}
export const config = {
  matcher: '/',
}