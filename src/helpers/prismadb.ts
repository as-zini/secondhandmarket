// 프리즈마를 이용하여 db에 데이터를 저장하기 위해 쓰는 프리즈마 객체를 따로 파일로 만들어서
// 필요할때마다 불러와서 사용할 수 있도록 모듈화 함

import { PrismaClient } from "@prisma/client";

declare global{
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

