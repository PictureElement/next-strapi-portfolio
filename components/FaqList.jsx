import FaqEntry from "./FaqEntry";

export default function FaqList({ faqList }) {
  console.log("Hello from FaqList");
  return (
    <div className="space-y-4">
      {faqList.map((entry) => (
        <FaqEntry
          key={entry.id}
          question={entry.question}
          answer={entry.answer}
        />
      ))}
    </div>
  );
}