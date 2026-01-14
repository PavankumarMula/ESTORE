import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = async ({searchParams}:{searchParams:Promise<{category:string}>}) => {
  const category =  (await searchParams).category
  return (
    <>
    <div className="relative aspect-[3/1] m-4"> {/* Set a height/width on parent */}
      <Image
        src="/featured.png"
        alt="featured"
        fill
        className="object-cover"
      />
    </div>
    <div >
      <ProductList category={category} pageName="home"/>
    </div>
    </>
  )
}

export default Homepage