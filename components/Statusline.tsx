'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Statusline = () => {
  const [scrollPercentage, setScrollPercentage] = useState('TOP')
  const path = usePathname()

  const translatePathName = (path: string) => {
    if (path === '/') return './home'
    return `./blog/${path.toLowerCase().replaceAll('%20', '-').split('/').pop()}`
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
    if (result >= 100) {
      setScrollPercentage('BOTTOM')
    } else if (result <= 0) {
      setScrollPercentage('TOP')
    } else {
      setScrollPercentage(`${result}%`)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', getScrollPercentage)
  }, [])

  return (
    <div className="fixed bottom-0 flex w-[100%]">
      <div className="bg-pink px-4">STATUS</div>
      <div className="flex-1 overflow-hidden bg-secondary px-4">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">{translatePathName(path)}</p>
      </div>
      <div className="hidden bg-indigo px-4 sm:block">UTF-8</div>
      <div className="w-[100px] bg-purple px-4 text-center">{scrollPercentage}</div>
    </div>
  )
}

export default Statusline
