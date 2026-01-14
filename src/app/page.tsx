import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = () => {
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
      <ProductList/>
    </div>
    </>
  )
}

export default Homepage