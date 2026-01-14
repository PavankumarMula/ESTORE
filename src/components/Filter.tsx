"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
    const SearchParams  = useSearchParams();
    
    const pathName = usePathname();
    const router = useRouter();

    const handleSort = (e:React.ChangeEvent<HTMLSelectElement>)=>{
          const {name,value} = e.target;
        const params = new URLSearchParams(SearchParams);
        params.set("sort",value||"newest");
        router.push(`${pathName}?${params.toString()}`)
    }
    return (
        <>
          <div className="flex justify-end p-4 mt-2">
           
  <select
    name="sort"
    id="sort"
    onChange={handleSort}
    className="w-full sm:w-auto rounded-md border border-gray-300 
               bg-white px-3 py-2 text-sm text-gray-700 
               outline-none transition
               focus:border-gray-900 focus:ring-2 focus:ring-gray-900"
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="asc">Price : Low To High</option>
    <option value="dsc">Price : High To Low</option>
    <option value="best">Best Selling</option>
  </select>
</div>

        </>
    )
}
export default Filter;