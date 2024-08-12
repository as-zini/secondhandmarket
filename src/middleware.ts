import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export {default} from 'next-auth/middleware';


//  로그인 된 사람만 지정해준 경로에 접근할 수 있도록 해주는 nextAuth의 기능
// export const config = {matcher: ["/admin/:path*", "/user"]}

export async function middleware(req: NextRequest){
  const session = await getToken({ req, secret:process.env.JWT_SECRET});
  const pathName = req.nextUrl.pathname;

  //로그인된 유저만 접근 가능
  if(pathName.startsWith('/user') && !session){
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  //어드민 유저만 접근 가능
  if(pathName.startsWith('/admin') && (session?.role !== 'Admin')){
    return NextResponse.redirect(new URL('/', req.url));
  }

  //로그인된 유저는 로그인, 회원가입 페이지에 접근 불가
  if(pathName.startsWith('/auth') && session){
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}