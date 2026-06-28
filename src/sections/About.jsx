import { aboutData } from "../data/portfolioData";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[#0F172A] text-white px-5 sm:px-6 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-3 md:gap-4 mb-12 md:mb-16 font-mono">
          <span className="text-base md:text-lg text-slate-500">01.</span>

          <span className="text-3xl sm:text-4xl font-bold text-white">
            About <span className="text-cyan-400">Me</span>
          </span>
        </h2>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* About Card */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">
                {aboutData.subHeading}
              </h3>

              <p className="text-slate-300 leading-7 sm:leading-8 text-[15px] sm:text-lg mb-5">
                {aboutData.description}
              </p>

              <p className="text-slate-400 leading-7 sm:leading-8 text-sm sm:text-base">
                My goal is to build clean, scalable and responsive web
                applications with modern UI/UX while writing maintainable code.
                I enjoy solving real-world problems through technology and
                continuously learning new tools to improve my development
                workflow.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
            {aboutData.stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
              >
                {/* Glow */}
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

                <div className="relative">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-[11px] sm:text-sm uppercase tracking-[0.15em] text-slate-400 font-mono">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
