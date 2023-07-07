import { useEffect, useRef } from "react"

function useRunOnce(callback: any): void {
  const isFirstRender: React.MutableRefObject<boolean> = 
    useRef(true)
  
  useEffect(() => {
    if (isFirstRender.current) {
      callback()
      isFirstRender.current = false
    }
  }, [])
}

export default useRunOnce