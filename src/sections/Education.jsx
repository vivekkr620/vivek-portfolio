import { educationData } from "../data/portfolioData";
import {
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

const Education = () => {
  return (
    <section
      id="education"
      className="py-16 sm:py-20 lg:py-28 bg-[#0F172A] text-white px-4 sm:px-6 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14 lg:mb-16 font-mono flex-wrap">
          <span className="text-base sm:text-lg text-slate-500">05.</span>

          <span className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Education <span className="text-cyan-400">& Learning</span>
          </span>
        </h2>

        {/* Education Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]">
          {/* Glow */}
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

          <div className="relative">
            {/* Top */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 pb-6 border-b border-slate-700">
              {/* Left */}
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
                  {educationData.institution}
                </h3>

                <p className="mt-3 text-base sm:text-lg text-slate-300 leading-7">
                  {educationData.degree} in{" "}
                  <span className="text-cyan-400 font-semibold">
                    {educationData.field}
                  </span>
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <span className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
                  <FiCalendar className="text-cyan-400 flex-shrink-0" />
                  <span>{educationData.timeline}</span>
                </span>

                <span className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
                  <FiMapPin className="text-cyan-400 flex-shrink-0" />
                  <span>{educationData.location}</span>
                </span>
              </div>
            </div>

            {/* Metric */}
            <div className="mt-6 sm:mt-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 flex-wrap">
                <FiBookOpen />
                {educationData.metrics}
              </span>
            </div>

            {/* Highlights */}
            <div className="mt-8 sm:mt-10">
              <h4 className="mb-5 font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-cyan-400">
                Key Focus Areas
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationData.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-800"
                  >
                    <FiCheckCircle className="mt-1 text-cyan-400 flex-shrink-0 text-lg" />

                    <span className="text-sm sm:text-base text-slate-300 leading-7">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
