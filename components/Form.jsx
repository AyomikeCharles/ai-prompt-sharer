import Link from "next/link"

function Form({type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="px-3 md:px-10">
      <h1 className="mt-10 font-bold text-blue-500 text-3xl">
        {type} Post
      </h1>
      <p className="text-blue-900/70 my-3">
        {type} and share amazing prompt in the world and let your imagination run wild with AI powered platform
      </p>
      <form
        onSubmit={handleSubmit}
      >

        <div>
          <label>
            <span className="text-blue-900/70">Your AI prompt</span>
          </label>
          <br/>
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt:e.target.value})}
            placeholder="Write Your Prompt Here"
            required
            className="shadow focus:outline-none w-full md:w-[400px] h-[250px] p-3 bg-gray-50 text-blue-900/50 rounded"
          />
        </div>



        <div className="my-3">
          <label>
            <span className="text-blue-900/70">Tag e.g #webdev, #food, #tech </span>
          </label>
          <br/>
          <input
            value={post.tag}
            onChange={(e)=>setPost({...post, tag:e.target.value})}
            placeholder="tag"
            required
            className="shadow w-full text-blue-900/50 focus:outline-none rounded bg-gray-50 md:w-[400px] p-2"
          />
        </div>
        <div className="my-5">
          <Link href='/' className="mx-3 text-red-500">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="shadow bg-blue-500 rounded-full text-white px-3 py-2">
            {submitting ? `${type}...`: type}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form