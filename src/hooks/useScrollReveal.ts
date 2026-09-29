import { useEffect } from 'react'

/**
 * Custom hook to dynamically observe elements with reveal classes
 * and trigger smooth GPU-accelerated entrance animations on scroll.
 */
export function useScrollReveal(dependencyKey?: any) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for older browsers: reveal everything immediately
      document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        el.classList.add('is-revealed')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            // Once revealed, unobserve to keep performance 60fps
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    // Select all elements to animate
    const elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
    )
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [dependencyKey])
}
