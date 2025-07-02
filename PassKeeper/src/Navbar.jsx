
function Navbar() {

    return (
<div className="bg-gradient-to-r from-indigo-900 to-slate-900 h-[8vh] w-full flex items-center justify-around shadow-lg">
  <div className="text-xl sm:text-3xl font-extrabold tracking-wide">
    <span className="text-yellow-400 hover:scale-105 transition-transform duration-300">Pass</span>
    <span className="text-cyan-400 hover:scale-105 transition-transform duration-300">Keeper</span>
  </div>

  <a
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors duration-300 group"
  >
    <img
      src="/Github.png"
      className="invert size-6 sm:size-7 group-hover:scale-110 transition-transform duration-300"
      alt="GitHub"
    />
    <h1 className="text-xl font-semibold tracking-wide group-hover:underline">GitHub</h1>
  </a>
</div>

    )

}
export default Navbar;