import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Rule Engine using AST
      </h1>
      <nav className="flex space-x-8">
        <Link
          to="/create-rule"
          className="text-xl font-semibold text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Create Rule
        </Link>
        <Link
          to="/evaluate-rule"
          className="text-xl font-semibold text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Evaluate Rule
        </Link>
        <Link
          to="/combine-rule"
          className="text-xl font-semibold text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Combine Rule
        </Link>
      </nav>
    </div>
  );
};

export default Home;