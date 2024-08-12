import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
 
const prisma = new PrismaClient()
 
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
        username: { label: "Username", type:"text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,req) {
        const user = {id:"1", name:"J smith", email:"jsmith@example.com", role: "User"}
        
        if(user){
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  jwt:{
    secret: 'secret',
    maxAge: 30 * 24 * 60 * 60
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