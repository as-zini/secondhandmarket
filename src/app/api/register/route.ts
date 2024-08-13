import bcrypt from 'bcryptjs';
import prisma from '@/helpers/prismadb'
import { NextResponse } from 'next/server';


//api/register로 요청을 보내면 처리할 로직을 아래 코드로 작성
export async function POST(request: Request){

  const body = await request.json();

  const{
    email,
    name,
    password
  } = body;

  //받아온 패스워드를 hash를 이용해 암호화하는 코드
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data:{
      email,
      name,
      hashedPassword
    }
  })


  return NextResponse.json(user);
}