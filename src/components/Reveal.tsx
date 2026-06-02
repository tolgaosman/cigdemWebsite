'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  direction?: Direction
  /** Stagger ile çocuk Reveal'lar arasında gecikme uygula */
  stagger?: boolean
  /** Etiketi değiştir (örn. 'section', 'span') */
  as?: 'div' | 'section' | 'span' | 'li' | 'ul'
}

/**
 * Scroll'a girince yumuşakça beliren (fade + kayma) sarmalayıcı.
 * `stagger` verilirse, içindeki <Reveal> çocukları sırayla belirir.
 * prefers-reduced-motion'da Motion otomatik olarak hareketi azaltır.
 */
export default function Reveal({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
  stagger = false,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div
  const { x, y } = offset[direction]

  if (stagger) {
    return (
      <MotionTag
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
        }}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Stagger container içindeki tekil öğe (Reveal stagger ile birlikte kullanılır). */
export function RevealItem({
  children,
  className,
  style,
  direction = 'up',
  as = 'div',
}: Omit<RevealProps, 'stagger' | 'delay'>) {
  const MotionTag = motion[as] as typeof motion.div
  const { x, y } = offset[direction]

  return (
    <MotionTag
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </MotionTag>
  )
}
