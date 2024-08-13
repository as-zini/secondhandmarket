import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession(){
  return await getServerSession(authOptions);
}


// getServerSession을 이용해 세션의 유저정보를 가져오는 함수(모듈화 함)
export default async function getCurrentUser(){
  try{
    const session = await getSession();
     
    if(!session?.user?.email){
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where:{
        email: session.user.email
      }
    })

    if(!currentUser){
      return null;
    }

    return currentUser;

  } catch(error){
    return null;
  }
}