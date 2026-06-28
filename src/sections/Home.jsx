import { homeData } from "../data/portfolioData";
import profileImg from "../assets/vivek.jpg";
import resume from "../assets/pdf/Vivek_Resume.pdf";

const Home = () => {
  const handleDownload = () => {
    if (!resume.startsWith("data:") && !resume.startsWith("blob:")) {
      return;
    }
  };
  return (
    <section
      id="home"
      className="min-h-screen bg-[#0F172A] border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div>
          <p className="font-mono uppercase tracking-[0.3em] text-cyan-400 mb-5">
            {homeData.welcomeTag}
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
            {homeData.name}
          </h1>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight text-slate-400">
            {homeData.title}
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            {homeData.subtitle}
          </p>

          {/* Buttons Stack */}
          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="#projects"
              className="rounded-full bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(34,211,238,.35)]"
            >
              {homeData.ctaWork}
            </a>

            {/* UPDATED SECURE ANCHOR SPECIFICATION */}
            <a
              href={resume}
              download="Vivek_Kumar_Resume.pdf" // downloadable file name
              onClick={handleDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-slate-300 font-semibold transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-1"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-8 rounded-full bg-cyan-500/20 blur-3xl"></div>

            {/* Outer Circle Container */}
            <div className="relative w-80 h-80 rounded-full border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl p-4">
              {/* Animated Rotating Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin [animation-duration:20s]"></div>

              {/* Profile Image Viewport */}
              <div className="w-full h-full rounded-full overflow-hidden border border-slate-700 bg-slate-800">
                <img
                  src={profileImg} //  Dynamic Bundled Variable
                  alt="Vivek Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Role Title Badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-cyan-500/20 bg-slate-900/80 px-6 py-3 backdrop-blur-xl">
              <span className="font-mono text-sm text-cyan-400">
                Full Stack Developer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
