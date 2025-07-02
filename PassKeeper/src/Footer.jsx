function Footer() {
  return (
    <footer className="min-h-[10vh] w-full bg-gradient-to-r from-indigo-900 to-slate-900 flex flex-col py-2 text-white shadow-inner z-10 justify-center items-center">
      <div className="text-sm md:text-base font-medium tracking-wide">
        Made with <span className="text-xl">❤️</span> by <span className="text-yellow-400">Samir Shaikh</span>
      </div>
      <div className="text-sm md:text-base italic text-gray-300">
        "Secure. Simple. Yours." — <span className="text-cyan-400">PassKeeper</span>
      </div>
    </footer>
  );
}

export default Footer;
