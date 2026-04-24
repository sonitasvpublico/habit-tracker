import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

type AnimatedEmptyStateProps = {
  animationPath: string
  fallbackEmoji: string
  title: string
  line1: string
  line2: string
}

export function AnimatedEmptyState({
  animationPath,
  fallbackEmoji,
  title,
  line1,
  line2,
}: AnimatedEmptyStateProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    void fetch(animationPath)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json) setAnimationData(json as object)
      })
      .catch(() => {
        // Keep fallback emoji animation if no Lottie file exists yet.
      })

    return () => {
      cancelled = true
    }
  }, [animationPath])

  return (
    <div className="empty-list-card" role="status" aria-live="polite">
      <div className="empty-list-media" aria-hidden>
        {animationData ? (
          <Lottie animationData={animationData} loop autoplay className="empty-list-lottie" />
        ) : (
          <div className="empty-list-emoji empty-list-emoji--animated">{fallbackEmoji}</div>
        )}
      </div>
      {title.trim().length > 0 && <p className="empty-list-title">{title}</p>}
      {line1.trim().length > 0 && <p className="empty-list">{line1}</p>}
      {line2.trim().length > 0 && <p className="empty-list">{line2}</p>}
    </div>
  )
}
