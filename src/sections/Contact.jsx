import { contactData } from "../data/portfolioData";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { BsMedium } from "react-icons/bs";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28 bg-[#0F172A] text-white px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-mono uppercase tracking-[0.22em] text-cyan-400 text-xs sm:text-sm mb-4">
            07. What's Next?
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {contactData.title}
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-400 leading-7 sm:leading-8">
            {contactData.subtitle}
          </p>
        </div>

        {/* Contact Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]">
          {/* Glow */}
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

          <div className="relative">
            {/* CTA */}
            <div className="flex justify-center mb-10">
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/20"
              >
                <FiMail />
                Say Hello
              </a>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-700 pt-8">
              {/* Location */}
              <div className="flex items-center justify-center sm:justify-start gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-4">
                <FiMapPin className="text-cyan-400 text-xl flex-shrink-0" />

                <span className="text-sm sm:text-base text-slate-300 text-center sm:text-left">
                  {contactData.location}
                </span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center justify-center sm:justify-start gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-4 text-slate-300 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <FiPhone className="text-cyan-400 text-xl flex-shrink-0" />

                <span className="text-sm sm:text-base">
                  {contactData.phone}
                </span>
              </a>
            </div>

            {/* Social */}
            <div className="mt-10 flex justify-center gap-5 sm:gap-6">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <FiGithub size={22} />
              </a>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <FiLinkedin size={22} />
              </a>

              <a
                href={contactData.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <BsMedium size={22} />
              </a>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t border-slate-700 pt-6 text-center">
              <p className="text-xs sm:text-sm text-slate-500 font-mono tracking-wide">
                Designed & Built with ❤️ by
              </p>

              <p className="mt-2 text-sm sm:text-base font-semibold text-cyan-400">
                Vivek Kumar © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
