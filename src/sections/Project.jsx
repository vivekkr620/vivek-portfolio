import { projects } from "../data/portfolioData";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-[#0F172A] text-white px-5 sm:px-6 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-3 md:gap-4 mb-12 md:mb-16 font-mono">
          <span className="text-base md:text-lg text-slate-500">03.</span>

          <span className="text-3xl sm:text-4xl font-bold text-white">
            Featured <span className="text-cyan-400">Projects</span>
          </span>
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
            >
              {/* Glow */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20"></div>

              <div className="relative flex h-full flex-col p-5 sm:p-6">
                {/* Header */}
                <div className="mb-4 sm:mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                    <FiFolder className="text-xl sm:text-2xl text-cyan-400" />
                  </div>

                  <div className="flex gap-5 text-xl text-slate-400">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-cyan-400"
                    >
                      <FiGithub />
                    </a>

                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-cyan-400"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg sm:text-xl font-bold text-white transition group-hover:text-cyan-300">
                  {project.title}
                </h3>

                {/* Image */}
                <div className="mb-5 h-56 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Description */}
                <ul className="flex-grow space-y-2.5">
                  {project.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm sm:text-[15px] leading-6 text-slate-300"
                    >
                      <span className="mr-3 mt-1 text-cyan-400">▹</span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-700 pt-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
