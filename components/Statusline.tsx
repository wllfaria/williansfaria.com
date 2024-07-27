'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Statusline = () => {
  const [scrollPercentage, setScrollPercentage] = useState('TOP')
  const path = usePathname()

  const translatePathName = (path: string) => {
    return (
      {
        '/': './home',
      }[path] || `.${path}`
    )
  }

  const getScrollPercentage = () => {
    const body = document.body
    const html = document.documentElement
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const viewportHeight = window.innerHeight
    const currentScroll = window.scrollY
    const maxScroll = Math.max(height - viewportHeight, 1)
    const result = Math.round((currentScroll / maxScroll) * 100)
    const percentMap = {
      '0%': 'TOP',
      '100%': 'BOTTOM',
    }
    const shaped = `${result}%`
    const newScrollPercentage = percentMap[shaped] || shaped
    setScrollPercentage(newScrollPercentage)
  }

  useEffect(() => {
    window.addEventListener('scroll', getScrollPercentage)
  }, [])

  return (
    <div className="fixed bottom-0 flex w-[100%]">
      <div className="bg-pink px-4">STATUS</div>
      <div className="flex-1 bg-secondary px-4">
        <p>{translatePathName(path)}</p>
      </div>
      <div className="bg-indigo px-4">UTF-8</div>
      <div className="w-[100px] bg-purple px-4 text-center">{scrollPercentage}</div>
    </div>
  )
}

export default Statusline
