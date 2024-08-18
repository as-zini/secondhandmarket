import getProducts, { ProductsParams } from "@/app/actions/getProducts";
import Image from "next/image";

interface HomeProps{
  searchParams: ProductsParams
}


//파일 이름을 괄호 안에 넣어주면 파일 경로상에서는 아무런 변화가 없지만 명시적으로 파일을 정리해줄 수 있음
export default async function Home({searchParams}:HomeProps) {
  console.log(searchParams)
  const products = await getProducts(searchParams)

  console.log(products)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>하이</div>
    </main>
  );
}
