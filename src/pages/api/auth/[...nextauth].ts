import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/helpers/prismadb'
import bcrypt from 'bcryptjs';

 

 
export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name:"Credential",
      credentials: {
        email: { label: "Email", type:"text" },
        password: { label: "Password", type: "password" },
      },

      //signin에 요청을 보내면 아래의 로직 실행
      async authorize(credentials,req) {
        //이메일과 비밀번호가 없을 시 에러
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid credentials');
        }

        //프리즈마 db에 저장된 유저 데이터와 로그인시 받은 유저 이메일을 비교하는 코드
        const user = await prisma.user.findUnique({
          where:{
            email: credentials.email
          }
        })
        //유저 데이터는 있지만 패스워드가 없을때 에러
        if(!user || !user?.hashedPassword){
          throw new Error('Invalid credentials')
        }
        //로그인시 입력한 패스워드와 데이터에 해시되어 저장되어있는 비밀번호를 bcrypt의 compare메소드를 통해 비교하는 코드
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if(!isCorrectPassword){
          throw new Error('Invalid credentials')
        }

        return user;

        
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  jwt:{
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60
  },
  pages:{
    signIn:'/auth/login'
  },
  callbacks:{
    async jwt({token,user}){
      return{...token, ...user}
    }
,
    async session({session, token}){
      session.user = token;
      return session;
    }
  }
}


export default NextAuth(authOptions)