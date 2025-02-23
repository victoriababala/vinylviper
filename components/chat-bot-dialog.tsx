import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { BotMessageSquare, Music4 } from "lucide-react";
import { predefinedAnswers } from "@/lib/utils";

import { CircleHelp } from "lucide-react";

const ChatBotDialog = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [isOpen, setIsDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  const lockScroll = () => {
    scrollPositionRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPositionRef.current);
  };

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      setMessages([
        { sender: "bot", text: "Hello! How can I help you today?✨" },
      ]);
    } else {
      unlockScroll();
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };
    const botResponseText =
      predefinedAnswers[message] ||
      "I'm sorry, I don't understand that question.";
    const botMessage = { sender: "bot", text: botResponseText };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-4 right-4 p-3 bg-rose-950 text-white rounded-full shadow-lg">
          <CircleHelp />
        </button>
      </DialogTrigger>
      <DialogTitle className="text-transparent">FAQ Chatbot</DialogTitle>
      <DialogContent
        className="w-full max-w-[40rem] h-full max-h-[45rem] flex flex-col p-4 bg-white shadow-2xl rounded-xl"
        style={{ overflow: "hidden" }}
      >
        <h5 className="text-xl font-bold text-center">FAQ Chatbot</h5>
        <div className="flex-1 overflow-y-auto p-4 border rounded mb-6 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 flex items-start ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 mr-2">
                  <BotMessageSquare className="text-gray-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-rose-950 text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-950 ml-2">
                  <Music4  className="text-white w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-gray-700">
            Select a question:
          </h3>
          <div className="flex overflow-x-auto gap-2">
            {Object.keys(predefinedAnswers).map((question, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-4 py-2 border rounded-lg hover:bg-rose-950 hover:text-white bg-white text-gray-800 shadow-sm whitespace-nowrap transition-colors duration-200"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBotDialog;
