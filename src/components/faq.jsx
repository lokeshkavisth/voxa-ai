import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AI help in resume building?",
    answer:
      "AI analyzes job descriptions and tailors your resume to highlight the most relevant skills, experience, and keywords to boost your chances of getting noticed by hiring managers and ATS systems.",
  },
  {
    question: "What kind of interview preparation does the platform offer?",
    answer:
      "Our AI generates personalized interview questions based on the job role you're targeting. It provides feedback on your responses, helping you refine your answers and boost your confidence.",
  },
  {
    question: "How accurate are the industry insights provided?",
    answer:
      "Our industry insights are powered by real-time data and analysis from reputable sources, ensuring that the information you receive is up-to-date and reflects the current job market, salary trends, and in-demand skills.",
  },
  {
    question: "Can I track my progress with quizzes?",
    answer:
      "Yes, you can monitor your performance with detailed stats on quiz results, including average scores, total questions practiced, and areas where you can improve. It helps you stay on track for your career growth.",
  },
  {
    question: "How do the AI-generated quizzes work?",
    answer:
      "The quizzes are powered by AI and designed to adapt to your skill level, helping you practice for interviews or improve your knowledge in areas that need development. Each quiz is tailored to challenge you effectively.",
  },
];

export default function FAQ() {
  return (
    <section className="container py-24 md:py-32 mx-auto">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
