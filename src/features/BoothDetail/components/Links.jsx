import { useState } from "react";

import orange from "../assets/link-orange.svg";
import white from "../assets/link-white.svg";
import down from "../assets/down-icon.svg";
import github from "../assets/github-logo.png";
import figma from "../assets/figma-logo.svg";
import notion from "../assets/notion-logo.png";
import exchangeDefault from "../assets/exchange-default.svg";
import exchangeClick from "../assets/exchange-click.svg";

function normalizeLinks(links, legacyLink) {
  const values = [
    ...(Array.isArray(links) ? links : []),
    legacyLink,
  ].filter((link) => typeof link === "string" && link.trim());

  return [...new Set(values.map((link) => link.trim()))];
}

function createLinkItems(links, label, icon, iconClassName) {
  return links.map((href, index) => ({
    href,
    label: links.length > 1 ? `${label} ${index + 1}` : label,
    icon,
    iconClassName,
  }));
}

function isNotionLink(link) {
  try {
    const hostname = new URL(link).hostname.toLowerCase();
    return hostname === "notion.so" || hostname.endsWith(".notion.so") ||
      hostname === "notion.site" || hostname.endsWith(".notion.site") ||
      hostname === "notion.com" || hostname.endsWith(".notion.com");
  } catch {
    return link.toLowerCase().includes("notion");
  }
}

export default function Links({
  booth,
  isRefactoringReport,
  setIsRefactoringReport,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const serviceLinks = normalizeLinks(booth.servicelinks, booth.servicelink);
  const githubLinks = normalizeLinks(booth.githublinks, booth.githublink);
  const figmaLinks = normalizeLinks(booth.figmalinks, booth.figmalink);
  const etcLinks = normalizeLinks(booth.etclinks);
  const notionLinks = etcLinks.filter(isNotionLink);
  const otherLinks = etcLinks.filter((link) => !isNotionLink(link));

  const linkItems = [
    ...createLinkItems(
      serviceLinks,
      "서비스 링크",
      orange,
      "w-[1rem] h-[1rem] object-contain",
    ),
    ...createLinkItems(
      figmaLinks,
      "Figma",
      figma,
      "w-[1rem] h-[1rem] object-contain",
    ),
    ...createLinkItems(
      githubLinks,
      "GitHub",
      github,
      "w-[1.1rem] h-[1.1rem] object-contain bg-white rounded-full",
    ),
    ...createLinkItems(
      notionLinks,
      "Notion",
      notion,
      "w-[1rem] h-[1rem] object-contain",
    ),
    ...createLinkItems(
      otherLinks,
      "기타 링크",
      orange,
      "w-[1rem] h-[1rem] object-contain",
    ),
  ];

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
            onPointerDown={(event) => event.stopPropagation()}
          >
            {linkItems.length > 0 ? (
              linkItems.map((item, index) => (
                <div key={`${item.href}-${item.label}`}>
                  {index > 0 && <div className="h-px bg-[#2A2A2A]" />}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-[0.5rem] px-[1rem] py-[0.75rem] text-[0.875rem] transition-colors hover:text-[#FF6000]"
                    role="menuitem"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className={item.iconClassName}
                    />
                    <span>{item.label}</span>
                  </a>
                </div>
              ))
            ) : (
              <div className="px-[1rem] py-[0.75rem] text-[0.75rem] text-[#9A9A9A]">
                등록된 링크가 없습니다.
              </div>
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
