'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { ScrollArea } from "./ui/scroll-area"

export function Chatz() {

    const [messages, setMessages] = useState<any>([]);
    const [input, setInput] = useState<any>('');
  
    const handleInputChange = (e:any) => {
      setInput(e.target.value);
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessages([...messages, { id: Date.now(), role: 'user', content: input }, { id: Date.now() + 1, role: 'ai', content: data.content }]);
      } else {
        console.error('Error:', data.error);
      }
  
      setInput('');
    };
  


  return (
    <Popover>
      <PopoverTrigger asChild>
            <Button variant="outline" className="fixed bottom-0 bg-blue-400 w-[100px] font-semibold right-0  mb-9 mr-7 ">
                Chat
            </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <div className="grid gap-4">
                    <ScrollArea className="h-[350px] mx-1  p-1 w-full rounded-md border">
                {messages.map((message:any) => (
                    
                    <div key={message.id}  className='  my-4 border rounded-sm text-black'>
                    
                        {message.role === 'user' ? 'User: ' : 'AI: '}
                        {message.content}
                    
                    </div>
                
                ))}
                    </ScrollArea>
                <form onSubmit={handleSubmit}>
                    <div className='fixed left-1/2 -translate-x-1/2 bottom-6 w-1/2   text-md'>
                    <input name="prompt" value={input} placeholder='type here' onChange={handleInputChange}   className='text-black w-full mx-5 p-2 my-2 '/>
                    <Button className="mx-14  " type="submit">Submit</Button>
                    </div>
                </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}