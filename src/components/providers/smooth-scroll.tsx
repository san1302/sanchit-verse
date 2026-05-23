'use client'

import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins once at module scope. Safe — registerPlugin is
// idempotent and runs on the client only because this file is 'use client'.
// SplitText became free in 2024 (Webflow acquired GSAP); ships with gsap@3.13+.
gsap.registerPlugin(ScrollTrigger, SplitText)

interface SmoothScrollProps {
  readonly children: ReactNode
}

/**
 * Wraps the app in Lenis-driven smooth scroll AND bridges Lenis to
 * GSAP's ScrollTrigger so scroll-linked animations stay in sync.
 *
 * The bridge has two parts:
 *
 *  1. Drive Lenis from GSAP's ticker (autoRaf: false). Both libraries share
 *     a single requestAnimationFrame loop instead of competing for frames.
 *
 *  2. On every Lenis scroll, call ScrollTrigger.update(). Without this,
 *     ScrollTrigger reads the native window.scrollY, which lags behind
 *     Lenis's interpolated position — animations fire at the wrong moment.
 *
 * Accessibility: if the user has `prefers-reduced-motion: reduce`, we skip
 * Lenis entirely (native scroll) AND skip the bridge. GSAP animations still
 * run, but most of our ScrollTrigger-driven animations check the same media
 * query and bail out for reduced-motion users.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  // Sync Lenis with GSAP's ticker — single RAF loop for both libraries.
  useEffect(() => {
    if (reducedMotion) return

    function update(time: number) {
      // gsap.ticker provides time in seconds; Lenis wants milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    // Lag smoothing off — Lenis already smooths motion, GSAP smoothing fights it.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [reducedMotion])

  // Keep ScrollTrigger in sync with Lenis's virtual scroll position.
  useEffect(() => {
    if (reducedMotion) return

    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [reducedMotion])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false, // We drive RAF manually via gsap.ticker (see above).
      }}
    >
      {children}
    </ReactLenis>
  )
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
