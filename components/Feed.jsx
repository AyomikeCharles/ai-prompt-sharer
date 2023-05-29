'use client'
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

function PromptCardList({data, handleTagClick}){
    return(
        <div className='mt-16'>
            {data?.map((post)=>(
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={()=>handleTagClick(post.tag)}
                />
            ))}
        </div>
    )
}

function Feed() {
    const [search, setSearch] = useState('')
    const [post, setPost] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);


    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch('api/prompt')
            const data = await response.json()
            setPost(data)
        }

        fetchPosts()
    }, [])


    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i")
        return post.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        )
      }


      const handleSearch = (e) => {
        clearTimeout(searchTimeout);
        setSearch(e.target.value);
    
        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        )
      }



      const handleTagClick = (tagName) => {
        setSearch(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
      };


  return (
    <div className='my-10 px-4 md:px-10'>
        <div className='flex justify-center w-1/2 mx-auto'>
            <form>
                <input 
                type='text' 
                placeholder='Search' 
                value={search} 
                onChange={handleSearch} 
                className="shadow text-blue-900/50 p-2 rounded-full focus:outline-none w-[260px] md:w-[300px] bg-gray-50"
                />
            </form>
        </div>
        {
            searchedResults.length > 0 ?
            <PromptCardList
                data={searchedResults}
                handleTagClick={handleTagClick}
            />
            :
            <PromptCardList
                data={post}
                handleTagClick={handleTagClick}
            />
        }
        
    </div>
  )
}

export default Feed