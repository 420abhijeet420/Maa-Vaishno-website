import React from 'react'
import { Loader2 } from 'lucide-react'  // clean, modern spinner icon

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent text-primary gap-3">
      <Loader2 className="animate-spin w-10 h-10 text-primary" />
      <p className="text-sm font-medium opacity-80">{text}</p>
    </div>
  )
}

export default Loading
