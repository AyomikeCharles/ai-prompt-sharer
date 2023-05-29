import Image from 'next/image'
import Feed from '@components/Feed'

export default function Home() {
  return (
    <main className='my-16'>
      <h1 className='text-center text-3xl mb-3 font-extrabold'>
        Discover and Share
        <br className='hidden max-md:block'/>
        <span className='text-blue-500 font-extrabold'>  AI-Powered Prompts</span>
      </h1>
      <p className='text-center text-blue-900/70'>
        PromptSharer is an open-source AI prompting tool for modern world to discover, create and share creative ai prompts. 
      </p>
      <p className='text-center text-blue-900/70'>
        Remember to be as specific as possible in your prompts to get the most relevant and accurate responses from the AI
      </p>
      
      <Feed/>
    </main>
  )
}
