import { useEffect } from "react"


export const useClickOutside = (ref: React.RefObject<Element>, callback: (event: MouseEvent) => void) => {

  

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const {bottom, top, left, right} = ref.current.getBoundingClientRect()
      if (e.clientX > right || e.clientX < left || e.clientY > bottom || e.clientY < top) {
        callback(e)
      }
    }

    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  })
}