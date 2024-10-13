import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AmigosChatting from "../assets/Amigos Chatting.png";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "Question?", answer: "Answer" },
    { question: "Question?", answer: "Answer" },
    { question: "Question?", answer: "Answer" }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100 text-neutral font-roboto">
      {/* FAQ Section */}
      <div className="w-full lg:w-1/2 bg-neutral p-8">
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-4 shadow cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">{faq.question}</p>
                {activeIndex === index ? (
                  <FiChevronUp className="text-primary" />
                ) : (
                  <FiChevronDown className="text-primary" />
                )}
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-base text-accent">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="md:block flex-1 bg-primary flex justify-center items-center p-12 shadow-lg">
        <div className="text-center text-base-100">
          <div className="flex justify-center">
            <img src={AmigosChatting} alt="Illustration" className="mb-8" />
          </div>
          <p className="text-xl">
            Start Chat with your Friends, Make calls, Share your Screen and get
            Faster Now...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
