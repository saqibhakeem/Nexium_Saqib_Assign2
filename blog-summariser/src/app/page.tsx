export default function Home() {
  return (
    <>
      <div className="navbar bg-[#020202] shadow-s ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-[#F0E7D8] ">BlinkBlog</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <li className="bg-[#5BC0EB] text-[#020202] hover:bg-[#33658A] rounded-md mr-3">
              <a>Login</a>
            </li>
            <li className="bg-[#5BC0EB] text-[#020202] hover:bg-[#33658A] rounded-md">
              <a>Register</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(/landing-page-bg.png)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 w-full">
          <div className="max-w-md w-full bg-opacity-80 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
            <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              AI Blog Summarizer
            </h1>
            <p className="mb-5 text-base sm:text-lg md:text-xl">
              <span className="font-bold block mb-2">
                Too many blogs, too little time?
              </span>
              <span className="block">
                Summarize any blog instantly, in simple words — and even get the
                summary in Urdu! AI-powered, distraction-free reading. Fast.
                Clear. Effortless.
              </span>
            </p>
            <button className="btn bg-[#F0E7D8] font-bold text-[#020202] hover:bg-[#5BC0EB] hover:text-white border-[#33658A] w-full sm:w-auto py-2 px-6 text-base sm:text-lg rounded-full shadow-md transition-all duration-200 ease-in-out focus:outline-none">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
