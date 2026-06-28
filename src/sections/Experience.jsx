import { experiences } from "../data/portfolioData";
import {
  FiAward,
  FiCalendar,
  FiMapPin,
  FiDownload,
  FiBriefcase,
} from "react-icons/fi";

import cctCertificate from "../assets/pdf/CCT-internship.pdf";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-16 md:py-28 bg-[#0F172A] text-white px-5 md:px-6 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-4 mb-12 md:mb-16 font-mono">
          <span className="text-base md:text-lg text-slate-500">02.</span>

          <span className="text-3xl md:text-4xl font-bold text-white">
            Professional <span className="text-cyan-400">Journey</span>
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-500 via-slate-700 to-transparent"></div>

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-0 md:pl-20">
                {/* Timeline Icon */}
                <div className="hidden md:flex absolute left-0 top-8 h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 bg-slate-900 shadow-lg shadow-cyan-500/10">
                  <FiBriefcase className="text-xl text-cyan-400" />
                </div>

                {/* Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)]">
                  {/* Glow */}
                  <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

                  <div className="relative">
                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>

                        <p className="mt-2 text-base md:text-lg text-cyan-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>

                      {/* Date + Location */}
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
                          <FiCalendar className="text-cyan-400" />
                          {exp.duration}
                        </span>

                        <span className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
                          <FiMapPin className="text-cyan-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="mt-6 space-y-3">
                      {exp.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm md:text-base text-slate-300 leading-6 md:leading-7"
                        >
                          <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0"></span>

                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Certificate */}
                    <div className="mt-8">
                      <a
                        href={cctCertificate}
                        download="Vivek_Kumar_CCT_Internship_Certificate.pdf"
                        className="flex sm:inline-flex w-full sm:w-fit items-center justify-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:scale-[1.02]"
                      >
                        <FiAward />
                        Download Certificate
                        <FiDownload />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
