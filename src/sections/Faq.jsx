import { faqData } from "../data/portfolioData";
import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-28 bg-[#0F172A] text-white px-4 sm:px-6 border-b border-slate-800"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14 lg:mb-16 font-mono flex-wrap">
          <span className="text-base sm:text-lg text-slate-500">06.</span>

          <span className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </span>
        </h2>

        {/* Accordion */}
        <div className="space-y-4 sm:space-y-5">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)]
                ${
                  isOpen
                    ? "border-cyan-400/50"
                    : "border-slate-700 hover:border-cyan-400/30"
                }`}
              >
                {/* Glow */}
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>

                {/* Question */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="relative flex w-full items-start justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left"
                >
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300
                      ${
                        isOpen
                          ? "border-cyan-400/50 bg-cyan-500/10"
                          : "border-slate-700 bg-slate-800"
                      }`}
                    >
                      <FiHelpCircle
                        className={`text-lg sm:text-xl ${
                          isOpen ? "text-cyan-400" : "text-slate-400"
                        }`}
                      />
                    </div>

                    {/* Question */}
                    <span
                      className={`text-base sm:text-lg font-semibold leading-7 transition-colors duration-300 ${
                        isOpen ? "text-cyan-300" : "text-slate-200"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Arrow */}
                  <FiChevronDown
                    className={`flex-shrink-0 text-xl sm:text-2xl mt-1 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-cyan-400"
                        : "text-slate-500 group-hover:text-cyan-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-[500px] border-t border-slate-700"
                      : "max-h-0"
                  }`}
                >
                  <div className="px-5 sm:px-7 py-5 sm:py-6 text-sm sm:text-base text-slate-300 leading-7 sm:leading-8">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
