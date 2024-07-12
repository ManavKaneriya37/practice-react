import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Navbar = () => {
  const [searchVal, setSearchVal] = React.useState("");
  const {totalQuantity, items} = useSelector(state => state.allCart)

  const filteredItems = items.filter(item => {
    if(!item.title) return false;

    const titleMatch = item.title.toLowerCase().includes(searchVal.toLowerCase())
    const tagMatch = item.tag.toLowerCase().includes(searchVal.toLowerCase())

    return titleMatch || tagMatch;
  })

  return (
    <div className='w-auto h-14 '>
        <div className='flex items-center justify-between mx-7 py-3'>
            <h1 className='text-2xl'>Foodie</h1>
            <div>
              <input 
              type="text"
              value={searchVal}
              placeholder='Search'
              onFocus={() => {
                document.querySelector('.searchValue').classList.remove('hidden')
              }}
              onChange={(e) =>{ 
                setSearchVal(e.target.value)
                if(searchVal.length > 0){
                  document.querySelector('.searchValue').classList.add('py-2') 
                  document.querySelector('.searchValue').classList.add('border') 
                }
                if(searchVal.length < 2){
                  document.querySelector('.searchValue').classList.remove('py-2') 
                  document.querySelector('.searchValue').classList.remove('border') 
                }
              }}
              className='px-1 search w-[35vw] h-9 mx-3 rounded-md border border-gray-100/10 bg-transparent text-white'
              />
            </div>
            <div className='relative'>
              <p className='cart-count absolute -top-1 left-3 h-4 w-4 flex items-center justify-center text-xs px-2 rounded-xl bg-white text-black'>{totalQuantity}</p>
              <NavLink to='/cart'>
                <i class="ri-shopping-cart-line text-xl cursor-pointer"></i>
              </NavLink>
            </div>
        </div>
        <div className='searchValue hidden w-[40vw] min-h-[0vh] bg-[#181818] absolute z-[1] ml-[31vw] border-zinc-200/20 rounded-lg'>
          {filteredItems && filteredItems.length < 5 ? (
            filteredItems.map(item => (
              <NavLink
              to={`/${item.title}`}
              key={item.id}
              className='flex items-center h-12 mx-4 my-1 gap-5 hover:bg-slate-200/5 rounded px-4'
              >
                <i class="ri-search-line text-black p-1 bg-gray-300 px-2 rounded"></i>
                <p className='text-white'>{item.title}</p>
              </NavLink>
            ))
          ): (
            <div></div>
          )}
        </div>
    </div>
  )
}

export default Navbar