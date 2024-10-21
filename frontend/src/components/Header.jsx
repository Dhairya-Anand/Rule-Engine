import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Rule</span>
            <span className="text-slate-700">Engine</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/create-rule">
            <li className=" text-slate-900 hover:underline">Create Rule</li>
          </Link>
          <Link to="/evaluate-rule">
            <li className=" text-slate-900 hover:underline">Evaluate Rule</li>
          </Link>
          <Link to="/combine-rule">
            <li className=" text-slate-900 hover:underline">Combine Rule</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
