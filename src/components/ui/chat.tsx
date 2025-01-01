'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Heart, MessageCircle, Mic, Users2, Smile } from 'lucide-react'
import { MicrophoneIcon } from '@heroicons/react/24/solid'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useState, useEffect, useRef } from 'react'

interface Message {
  id: number
  user: {
    name: string
    avatar: string
    verified: boolean
    subscriber?: boolean
  }
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    user: {
      name: "Elon Musk",
      avatar: "/elonmusk.png",
      verified: true,
      subscriber: true
    },
    content: "DUDE THAT WAS EPIC!!!!!"
  },
  {
    id: 2,
    user: {
      name: "Elon Musk",
      avatar: "/elonmusk.png",
      verified: true
    },
    content: "heh... bruh moment"
  },
  {
    id: 3,
    user: {
      name: "Aiden Wagner",
      avatar: "/aidenwagner.png",
      verified: true
    },
    content: "Yeah dude we should totally go to mars and stuff"
  },
  {
    id: 4,
    user: {
      name: "dawon 🗽",
      avatar: "/dawon.png",
      verified: true
    },
    content: "i eat food in the shower you should try it out"
  },
  {
    id: 5,
    user: {
      name: "Elon Musk",
      avatar: "/elonmusk.png",
      verified: true,
      subscriber: true
    },
    content: "Yeah dude we should totally go to mars and stuff"
  },
  {
    id: 6,
    user: {
      name: "Valinor Design",
      avatar: "/valinordesign.png",
      verified: true
    },
    content: "Yeah dude we should totally go to mars and stuff"
  },
  {
    id: 7,
    user: {
      name: "Kai",
      avatar: "/kaiwlson.png",
      verified: true,
      subscriber: true
    },
    content: "Yeah dude we should totally go to mars and stuff and other stuff aswell"
  }
]

const sampleMessages = [
  "This is absolutely incredible! 🚀",
  "No way, that just happened!",
  "I can't believe what I'm seeing right now",
  "This stream is fire 🔥",
  "Mind = blown",
  "Let's gooooo!",
  "This is the future",
  "Absolutely phenomenal content",
  "First time watching, instant follow!",
  "This made my day",
  "This is absolutely incredible! WOW WOW WOW WOW WOW"

]

const sampleUsers = [
  {
    name: "Elon Musk",
    avatar: "/elonmusk.png",
    verified: true,
    subscriber: true
  },
  {
    name: "Aiden Wagner",
    avatar: "/aidenwagner.png",
    verified: true
  },
  {
    name: "dawon 🗽",
    avatar: "/dawon.png",
    verified: true,
    subscriber: false
  },
  {
    name: "Valinor Design",
    avatar: "/valinordesign.png",
    verified: true
  },
  {
    name: "Kai",
    avatar: "/kaiwlson.png",
    verified: true,
    subscriber: true
  }
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [lastId, setLastId] = useState(initialMessages.length)
  const [inputValue, setInputValue] = useState("")
  const [messageCount, setMessageCount] = useState(initialMessages.length)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isNearBottom = () => {
    const container = messagesContainerRef.current
    if (!container) return true
    const threshold = 100 // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold
  }

  const handleScroll = () => {
    setShouldAutoScroll(isNearBottom())
  }

  const scrollToBottom = () => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, shouldAutoScroll])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '0px'
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = Math.min(Math.max(24, scrollHeight), 100) + 'px'
    }
  }

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: lastId + 1,
        user: {
          name: "You",
          avatar: "/you.png",
          verified: true,
          subscriber: true
        },
        content: inputValue.trim()
      }

      setLastId(prev => prev + 1)
      setMessages(prev => [...prev, newMessage])
      setMessageCount(prev => prev + 1)
      setInputValue("")
      textareaRef.current!.style.height = '24px'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)]
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)]

      const newMessage: Message = {
        id: lastId + 1,
        user: randomUser,
        content: randomMessage
      }

      setLastId(prev => prev + 1)
      setMessages(prev => [...prev, newMessage])
      setMessageCount(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [lastId])

  useEffect(() => {
    // Initial height adjustment
    adjustTextareaHeight()
  }, [])

  return (
    <div className="w-[404px] mx-auto flex flex-col gap-[10.41px] font-['Segoe_UI',_system-ui,_sans-serif]">
      {/* Main chat card */}
      <Card className="rounded-[14.69px] overflow-hidden bg-black text-white border border-zinc-800 shadow-lg">
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between px-9 py-4 border-b border-zinc-800">
            <h1 className="text-xl font-medium">Talking about flicker goo...</h1>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-300">
              <ChevronDown className="h-6 w-6 stroke-[3]" />
            </Button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-5 space-y-[10.41px]"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 p-3 rounded-[10px] ${
                  message.user.subscriber ? "bg-[#2B002C] border border-[#5E005F]" : ""
                }`}
              >
                <Avatar className="h-[25.4px] w-[25.4px] flex-shrink-0">
                  <AvatarImage src={message.user.avatar} />
                  <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-zinc-400 text-[14px]">{message.user.name}</span>
                    {message.user.verified && (
                      <Badge variant="secondary" className="h-[15px] w-[15px] p-0 bg-transparent flex-shrink-0">
                        <img src="/verified.svg" alt="Verified" className="w-full h-full" />
                      </Badge>
                    )}
                    {message.user.subscriber && (
                      <Badge className="h-[15px] w-[15px] p-0 bg-transparent flex-shrink-0">
                        <img src="/subscriber.svg" alt="Subscriber" className="w-full h-full" />
                      </Badge>
                    )}
                  </div>
                  <p className="text-white mt-1 text-[14px] leading-[17px] whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="min-h-[93.03px] px-[27.32px] py-[22.17px] flex items-start gap-[9.02px] border-t border-[#1D1D1D]">
            <div className="flex-1 bg-[#181818] rounded-[25px] min-h-[48.7px] border border-gradient-to-br from-[#494949] to-[#AFAFAF] flex items-center px-[18.36px]">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder="Send a message"
                className="bg-transparent text-white placeholder-zinc-500 flex-1 outline-none resize-none py-3 min-h-[24px] max-h-[100px] overflow-y-auto block w-full"
                style={{ height: '24px' }}
                rows={1}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-zinc-300 w-[22.04px] h-[22.04px] mt-3"
            >
              <Smile className="h-[16.53px] w-[16.53px] stroke-[1.84]" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Toolbar Card */}
      <Card className="rounded-[14.69px] bg-black border border-zinc-800 shadow-lg">
        <div className="px-[23.45px] py-[21.64px]">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="icon" className="w-[52.3px] h-[52.3px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
              <MicrophoneIcon className="h-[32px] w-[32px] fill-[#794BFA]" />
            </Button>
            <div className="flex items-center gap-[11.72px]">
              <Button variant="outline" size="icon" className="w-[37.88px] h-[36.97px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
                <Users2 className="h-[21.64px] w-[20.74px] text-white" />
              </Button>
              <Button variant="outline" size="icon" className="w-[37.88px] h-[37.88px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
                <Heart className="h-[21.64px] w-[21.64px] text-white" />
              </Button>
              <Button variant="default" className="h-[40.23px] rounded-full bg-white text-black hover:bg-zinc-200 px-[17.13px] flex items-center gap-[6.31px]">
                <MessageCircle className="h-[21.64px] w-[21.64px]" />
                <span className="text-[16px]">{messageCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
