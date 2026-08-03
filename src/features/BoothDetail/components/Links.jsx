import orange from "../assets/link-orange.svg";
import white from "../assets/link-white.svg";
import down from "../assets/down-icon.svg";
import github from "../assets/github-logo.png";
import figma from "../assets/figma-logo.svg";

import { useState } from "react";

export default function Links({ booth }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" w-full mt-[0.31rem] flex justify-between items-center">
      <div className="pt-[0.1rem] font-normal rounded-[0.625rem] bg-[#141414] cursor-pointer items-center justify-center w-[10.9375rem] h-[1.875rem]  flex flex-row gap-[0.3rem] ">
        <img src={orange} className="w-[1.5rem] h-[1.5rem]" />
        <a
          href={booth.servicelink}
          className="text-[#FF6000] text-[0.875rem]  "
        >
          서비스 링크
        </a>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="
          w-[10.9375rem]
          h-[1.875rem]
          rounded-[0.625rem]
          bg-[#141414]
          flex
          items-center
          justify-center
          gap-[0.31rem]
          pt-[0.1rem]
          cursor-pointer
        "
        >
          <img src={white} className="w-[1.5rem] h-[1.5rem]" />
          <span className="text-[0.875rem] leading-none">프로젝트 링크</span>
          <img src={down} className="w-[0.75rem] h-[0.75rem]" />
        </button>

        {isOpen && (
          <div
            className="
      absolute
      top-[2.3rem]
      right-0
      w-[10.9375rem]
      rounded-[0.625rem]
      bg-[#1E1E1E]
      overflow-hidden
      z-50
    "
          >
            {booth.figmalink && (
              <a
                href={booth.figmalink}
                target="_blank"
                rel="noopener noreferrer"
                className="
          flex
          items-center
          gap-[0.5rem]
          px-[1rem]
          py-[0.75rem]
          text-[0.875rem]
          transition-colors
          hover:text-[#FF6000]
        "
              >
                <img
                  src={figma}
                  alt="Figma"
                  className="w-[1rem] h-[1rem] object-contain"
                />
                <span>Figma</span>
              </a>
            )}

            {/* 둘 다 있을 때만 구분선 */}
            {booth.figmalink && booth.githublink && (
              <div className=" h-px bg-[#2A2A2A]" />
            )}

            {booth.githublink && (
              <a
                href={booth.githublink}
                target="_blank"
                rel="noopener noreferrer"
                className="
          flex
          items-center
          gap-[0.5rem]
          px-[1rem]
          py-[0.75rem]
          text-[0.875rem]
          transition-colors
          hover:text-[#FF6000]
        "
              >
                <img
                  src={github}
                  alt="GitHub"
                  className="w-[1.1rem] h-[1.1rem] object-contain bg-[white] rounded-[50%]"
                />
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
