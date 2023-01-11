import Link from "next/link";

// This should be the landing page
const Home = () => {
  return (
    <div className="my-5 grid grid-cols-12 content-evenly gap-2 px-5">
      <div className="col-span-8 col-start-3 flex items-center justify-center rounded-md border border-zinc-900 bg-teal-50">
        <h5 className=" text-3xl">Home Page</h5>
      </div>
      <div className="col-span-8 col-start-3 space-y-2 rounded-md border border-zinc-900 bg-teal-50 p-4">
        <div className="flex justify-center">
          <button className="border border-zinc-900 p-2 text-2xl hover:bg-red-400">
            <Link href={"/login"}>Login</Link>
          </button>
        </div>
        <div className="flex justify-center">
          <button className="border border-zinc-900 p-2 text-2xl hover:bg-red-400">
            <Link href={"/register"}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
