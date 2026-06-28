import { skillCategories } from "../data/portfolioData";

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-[#0F172A] text-white px-5 sm:px-6 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-3 md:gap-4 mb-12 md:mb-16 font-mono">
          <span className="text-base md:text-lg text-slate-500">04.</span>

          <span className="text-3xl sm:text-4xl font-bold text-white">
            Technical <span className="text-cyan-400">Skills</span>
          </span>
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
            >
              {/* Glow */}
              <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20"></div>

              {/* Category Title */}
              <h3 className="relative mb-5 text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-cyan-400 font-mono">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="relative flex flex-wrap gap-2.5 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="cursor-default rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium text-slate-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
