"use client";

import { useState } from "react";
import { askBot } from "@/actions/ai-bot";

export default function AiBot() {
  const [open, setOpen] = useState(false);
  const[ai,setAi]=useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askBot(input);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
   
      <button
      
        onClick={() => {
            setOpen(!open);
            setAi(!ai);
        }
        }
        className={`fixed bottom-6 right-6 z-50 text-xl bg-black text-white px-4 py-3 rounded-xl shadow-lg outline-dotted hover:text-gray-300 ${ai ? "animate-none" : "animate-bounce"} `}
      >
        🤖 Ask Me!!
      </button>

    
{open && (
  <div className="fixed bottom-20 right-6 w-[340px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 
                  animate-in slide-in-from-bottom-10 fade-in duration-300">

 
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-gray-200 p-4 font-semibold tracking-wide">
      Ask me anything ✨
    </div>

 
    <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm   max-h-[260px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`px-4 py-2 rounded-2xl max-w-[80%] shadow-sm transition-all duration-300
            ${msg.role === "user"
              ? "bg-green-600 text-black ml-auto rounded-br-sm"
              : "bg-blue-600 text-black rounded-bl-sm"
            }`}
        >
          {msg.text}
        </div>
      ))}

      {loading && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-fit animate-pulse">
          Typing...
        </div>
      )}
    </div>


    <div className="flex items-center border-t bg-white/80 backdrop-blur px-2 py-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask something..."
        className="flex-1 px-3 py-2 text-sm text-black bg-transparent outline-none "
      />
      <button
        onClick={handleSend}
        className="bg-gradient-to-r from-black to-gray-700 text-gray-200  px-4 py-2 rounded-lg 
                   hover:scale-105 hover:shadow-lg active:scale-95 transition-all"
      >
        Send
      </button>
    </div>
  </div>

)

}


  
    </>
  );
}
