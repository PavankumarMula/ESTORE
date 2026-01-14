import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
      <div className=" hidden sm:flex bg-gray-100 items-center p-1 ring-1 ring-gray-200 rounded-md gap-1 ">
        <CiSearch/>
        <input className="outline-none"/>
    </div>
  )
}

export default SearchBar