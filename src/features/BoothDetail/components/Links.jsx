import { useState } from "react";

import orange from "../assets/link-orange.svg";
import white from "../assets/link-white.svg";
import down from "../assets/down-icon.svg";
import github from "../assets/github-logo.png";
import figma from "../assets/figma-logo.svg";
import exchangeDefault from "../assets/exchange-default.svg";
import exchangeClick from "../assets/exchange-click.svg";

export default function Links({
  booth,
  isRefactoringReport,
  setIsRefactoringReport,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-[0.31rem] flex items-center gap-[0.5rem]">
      {/* 서비스 및 프로젝트 링크 */}
      <div className="relative flex-1 min-w-0">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="
            w-full
            h-[1.875rem]
            rounded-[0.625rem]
            bg-[#242424]
            flex
            items-center
            justify-center
            gap-[0.3rem]
            pt-[0.1rem]
            cursor-pointer
          "
        >
          <img src={white} alt="" className="w-[1.5rem] h-[1.5rem] shrink-0" />

          <span
            className="
              text-[clamp(0.75rem,2vw,0.875rem)]
              truncate
            "
          >
            서비스 링크
          </span>

          <img
            src={down}
            alt=""
            className={`w-[0.75rem] h-[0.75rem] shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="
              absolute
              top-[2.3rem]
              left-0
              w-full
              rounded-[0.625rem]
              bg-[#1E1E1E]
              overflow-hidden
              z-50
            "
            role="menu"
          >
            {booth.servicelink && (
              <a
                href={booth.servicelink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
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
                role="menuitem"
              >
                <img
                  src={orange}
                  alt=""
                  className=" w-[1rem] h-[1rem] object-contain"
                />
                <span>서비스 링크</span>
              </a>
            )}

            {booth.servicelink && (booth.figmalink || booth.githublink) && (
              <div className="h-px bg-[#2A2A2A]" />
            )}

            {booth.figmalink && (
              <a
                href={booth.figmalink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
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
                role="menuitem"
              >
                <img
                  src={figma}
                  alt="Figma"
                  className="w-[1rem] h-[1rem] object-contain"
                />
                <span>Figma</span>
              </a>
            )}

            {booth.figmalink && booth.githublink && (
              <div className="h-px bg-[#2A2A2A]" />
            )}

            {booth.githublink && (
              <a
                href={booth.githublink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
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
                role="menuitem"
              >
                <img
                  src={github}
                  alt="GitHub"
                  className="
                    w-[1.1rem]
                    h-[1.1rem]
                    object-contain
                    bg-white
                    rounded-full
                  "
                />

                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* 서비스 소개 / 리팩토링 보고서 전환 */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          setIsRefactoringReport((prev) => !prev);
        }}
        aria-pressed={isRefactoringReport}
        className={`
          flex-1
          min-w-0
          h-[1.875rem]
          rounded-[0.625rem]
          flex
          items-center
          justify-center
          gap-[0.3rem]
          pt-[0.1rem]
          cursor-pointer
          transition-colors
          ${isRefactoringReport ? "bg-[#29323A] text-[#5FB4FF]" : "bg-[#1E130D] text-[#FF6000]"}
        `}
      >
        <img
          src={isRefactoringReport ? exchangeClick : exchangeDefault}
          alt=""
          className="w-[1.5rem] h-[1.5rem] shrink-0"
        />
        <span className="text-[clamp(0.75rem,2vw,0.875rem)] truncate">
          {isRefactoringReport ? "리팩토링 보고서" : "서비스 소개"}
        </span>
      </button>
    </div>
  );
}
