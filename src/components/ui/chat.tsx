'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, Heart, MessageCircle, Users2, Smile } from 'lucide-react'
import { MicrophoneIcon } from '@heroicons/react/24/solid'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import '@fontsource-variable/noto-sans'

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
  "This is absolutely incredible! WOW WOW WOW WOW WOW",
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
  const [isChatOpen, setIsChatOpen] = useState(false)
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
      // Check if we're on mobile based on window width
      const isMobile = window.innerWidth < 768 // md breakpoint in Tailwind
      const baseHeight = isMobile ? 50 : 73
      const maxHeight = isMobile ? 100 : 150

      textarea.style.height = `${baseHeight}px`
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${Math.min(Math.max(baseHeight, scrollHeight), maxHeight)}px`
    }
  }

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      adjustTextareaHeight()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Reset textarea height when input value is empty
    if (inputValue === '') {
      const textarea = textareaRef.current
      if (textarea) {
        const isMobile = window.innerWidth < 768
        textarea.style.height = isMobile ? '50px' : '73px'
      }
    }
  }, [inputValue])

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
    <>
      {/* Chat Interface */}
      <div className="fixed inset-0 flex items-center justify-center font-['Segoe_UI']">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Main chat card */}
          <div className={`transition-opacity duration-200 ${isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Card className="w-[400px] md:w-[606px] rounded-[18px] md:rounded-[22px] overflow-hidden bg-black text-white border border-zinc-800 shadow-lg shadow-white/10">
              <div className="flex flex-col h-[600px] md:h-[900px]">
                {/* Header */}
                <div className="flex items-center justify-between px-7 md:px-10 py-5 md:py-6 border-b border-zinc-800">
                  <h1 className="text-2xl md:text-2xl font-medium font-['Segoe_UI'] flex items-center gap-1">
                    <span>Talking about TSLA earnings and</span>
                    <span className="text-zinc-500 text-2xl md:text-3xl font-bold leading-none ml-[-2px]">...</span>
                  </h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsChatOpen(false)}
                    className="text-zinc-400"
                  >
                    <ChevronDown className="w-6 h-6 md:w-8 md:h-8 stroke-[2] transform scale-[2]" />
                  </Button>
                </div>

                {/* Messages */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto px-6 md:px-8 space-y-3 md:space-y-4 font-['Segoe_UI']"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 md:gap-3 p-4 md:p-5 rounded-[12px] md:rounded-[15px] ${
                        message.user.subscriber ? "bg-[#2B002C] border border-[#5E005F]" : ""
                      }`}
                    >
                      <Avatar className="h-[30px] w-[30px] md:h-[38.1px] md:w-[38.1px] flex-shrink-0">
                        <AvatarImage src={message.user.avatar} />
                        <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="font-medium text-zinc-400 text-[16px] md:text-[21px] font-['Segoe_UI']">{message.user.name}</span>
                          {message.user.verified && (
                            <Badge variant="secondary" className="h-[18px] w-[18px] md:h-[22.5px] md:w-[22.5px] p-0 bg-transparent flex-shrink-0">
                              <Image src="/verified.svg" alt="Verified" width={18} height={18} className="w-full h-full md:hidden" />
                              <Image src="/verified.svg" alt="Verified" width={22} height={22} className="w-full h-full hidden md:block" />
                            </Badge>
                          )}
                          {message.user.subscriber && (
                            <Badge className="h-[18px] w-[18px] md:h-[22.5px] md:w-[22.5px] p-0 bg-transparent flex-shrink-0">
                              <Image src="/subscriber.svg" alt="Subscriber" width={18} height={18} className="w-full h-full md:hidden" />
                              <Image src="/subscriber.svg" alt="Subscriber" width={22} height={22} className="w-full h-full hidden md:block" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-white mt-1.5 md:mt-2 text-[16px] md:text-[21px] leading-[20px] md:leading-[25.5px] whitespace-pre-wrap break-words font-['Segoe_UI']">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="min-h-[100px] md:min-h-[139.5px] px-7 md:px-10 py-6 md:py-8 flex items-center gap-3 md:gap-4 border-t border-[#1D1D1D]">
                  <div className="flex-1 bg-[#181818] rounded-[25px] md:rounded-[37.5px] min-h-[50px] md:min-h-[73px] border border-gradient-to-br from-[#494949] to-[#AFAFAF] flex items-center px-5 md:px-7">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value)
                        adjustTextareaHeight()
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Send a message"
                      className="bg-transparent text-white placeholder-zinc-500 flex-1 outline-none resize-none py-4 md:py-6 min-h-[50px] md:min-h-[73px] max-h-[100px] md:max-h-[150px] block w-full text-[16px] md:text-[21px] font-['Segoe_UI'] leading-[1.2] align-middle"
                      style={{ height: '50px' }}
                      rows={1}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 w-[25px] h-[25px] md:w-[33px] md:h-[33px] self-center scale-[1.8] hover:bg-slate"
                  >
                    <Smile className="h-[18px] w-[18px] md:h-[24.8px] md:w-[24.8px] stroke-[1.84]" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Toolbar Card */}
          <Card className="w-[400px] md:w-[606px] rounded-[18px] md:rounded-[22px] bg-black border border-zinc-800 shadow-lg shadow-white/10">
            <div className="px-7 md:px-9 py-6 md:py-8">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="icon" className="w-[65px] h-[65px] md:w-[90px] md:h-[90px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
                  <MicrophoneIcon className="w-6 h-6 md:w-8 md:h-8 fill-[#794BFA] transform scale-[2]" aria-hidden="true" />
                </Button>
                <div className="flex items-center gap-3 md:gap-4">
                  <Button variant="outline" size="icon" className="w-[40px] h-[40px] md:w-[57px] md:h-[57px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
                    <Users2 className="w-3 h-3 md:w-4 md:h-4 text-white transform scale-[1.4]" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-[40px] h-[40px] md:w-[57px] md:h-[57px] rounded-full border-[#536B71] bg-black hover:bg-zinc-900">
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-white transform scale-[1.4]" />
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`h-[40px] md:h-[60px] rounded-full px-4 md:px-6 flex items-center gap-2 transition-colors font-['Segoe_UI'] ${
                      isChatOpen
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-black text-white border border-[#536B71] hover:bg-zinc-900"
                    }`}
                  >
                    <MessageCircle className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]" />
                    <span className="text-[18px] md:text-[24px]">{messageCount}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
