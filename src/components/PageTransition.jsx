import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('entered')

  useEffect(() => {
    if (displayChildren.key !== children.key) {
      setTransitionStage('exiting')
    }
  }, [children.key, displayChildren.key])

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setTransitionStage('entering')
      }, 150)
      return () => clearTimeout(timer)
    }
    if (transitionStage === 'entering') {
      const timer = setTimeout(() => {
        setTransitionStage('entered')
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [transitionStage, children])

  return (
    <div
      className={`page-transition page-transition--${transitionStage}`}
    >
      {displayChildren}
    </div>
  )
}
