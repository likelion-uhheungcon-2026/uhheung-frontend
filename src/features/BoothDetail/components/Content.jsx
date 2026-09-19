export default function BoothDetail({ booth, isRefactoringReport }) {
  if (isRefactoringReport) {
    const reportSections = [
      {
        title: "서비스 리팩토링 내용",
        content: booth.refactoring,
      },
      {
        title: "우리 팀의 협업 이야기",
        content: booth.collaboration,
      },
      {
        title: "서로에게 전하는 한 마디",
        content: booth.message,
      },
    ].filter(
      ({ content }) => typeof content === "string" && content.trim(),
    );

    return (
      <div className="text-[0.75rem] mt-[1rem] mb-[2.3rem] font-extralight">
        {reportSections.length > 0 ? (
          <div className="flex flex-col gap-[1rem]">
            {reportSections.map(({ title, content }) => (
              <section key={title}>
                <h3 className="text-[1rem] font-medium">{title}</h3>
                <div className="mt-[0.25rem] whitespace-pre-line leading-relaxed">
                  {content.trim()}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-[#9A9A9A]">
            등록된 리팩토링 보고서가 없습니다.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-[0.75rem] mt-[1rem] mb-[2.3rem] font-extralight">
      <div>{booth.content}</div>

      <div className="mt-[1rem]">
        <div className="text-[1rem] font-medium">주요기능</div>

        <ul className="list-disc pl-[1rem]">
          {booth.function.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-[1rem]">
        <div className="text-[1rem] font-medium">기술 스택</div>

        <ul className="list-disc pl-[1rem]">
          {booth.techstack.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
