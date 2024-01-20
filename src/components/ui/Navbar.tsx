import RestartGameBtn from "./RestartBtn";
import Settings from "./Settings";

const Navbar = () => {
  return (
    <nav data-testid="navbar">
      <ul className="flex flex-col flex-wrap md:flex-row justify-between items-center bg-blue-500X text-white p-4 bX">
        <span className="text-2xl font-bold" id="navbar-title">
          Learning Game
        </span>
        <li>
          <ul className="flex gap-4 items-center justify-center text-black font-bold">
            <li>
              <Settings />
            </li>
            <li className="cursor-pointer">
              <button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300">
                Addition
              </button>
            </li>
            <li className="cursor-pointer">
              <button className="bg-green-500 hover:bg-green-600 focus:bg-green-700 hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300">
                Subtraction
              </button>
            </li>
            <li className="cursor-pointer">
              <button className="bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 hover:shadow-xl rounded-full transition-all duration-300">
                Division
              </button>
            </li>
            <li className="cursor-pointer">
              <button className="bg-red-500 hover:bg-red-600 focus:bg-red-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300">
                Multiplication
              </button>
            </li>
            <li className="cursor-pointer">
              {/* <button
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
                onClick={handleGameReset}
              >
                Restart Game
              </button> */}
              <RestartGameBtn />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
