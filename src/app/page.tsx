import getProducts, { ProductsParams } from "@/app/actions/getProducts";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import FloatingButton from "@/components/FloatingButton";

interface HomeProps{
  searchParams: ProductsParams
}


//파일 이름을 괄호 안에 넣어주면 파일 경로상에서는 아무런 변화가 없지만 명시적으로 파일을 정리해줄 수 있음
export default async function Home({searchParams}:HomeProps) {
  const products = await getProducts(searchParams)
  const currentUser = await getCurrentUser();

  console.log(products)

  return (
    <Container>
      {/* Category &*/}
      {products?.data.length === 0
      ?
      <EmptyState/>
      :
      <>
        <div className="grid gird-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {products.data.map((product) => (
          <ProductCard
            currentUser={currentUser}
            key={product.id} //맵메소드로 순회하고 있기 때문에 무언가 하나의 요소를 쓰려면 고유한 값인 Key값이 있어야하므로 key값 설정
            data={product}
          />
        ))}
          
        </div>
      </>}
      <FloatingButton
        href="/products/upload"
      >+</FloatingButton>
    </Container>
  );
}
