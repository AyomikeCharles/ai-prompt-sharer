import Link from "next/link"

function Form({type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full">
      <h1>
        {type} Post
      </h1>
      <p>
        {type} and share amazing prompt in the world and let your imagination run wild with AI powered platform
      </p>
      <form
        onSubmit={handleSubmit}
      >

        <div>
          <label>
            <span>Your AI prompt</span>
          </label>
          <br/>
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt:e.target.value})}
            placeholder="Write Your Prompt Here"
            required
            className="border"
          />
        </div>



        <div>
          <label>
            <span>Tag </span>
          </label>
          <br/>
          <input
            value={post.tag}
            onChange={(e)=>setPost({...post, tag:e.target.value})}
            placeholder="#tag"
            required
            className="border"
          />
        </div>
        <div className="">
          <Link href='/'>
            cancel
          </Link>
          <button type="submit" disabled={submitting}>
            {submitting ? `${type}...`: type}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form