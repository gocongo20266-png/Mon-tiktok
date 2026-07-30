import { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'
import CommentsSheet from './CommentsSheet'

export default function VideoSlide({ video }) {
  const { session } = useAuth()
  const videoRef = useRef(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const loadCounts = async () => {
    const { count: likes } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('video_id', video.id)
    setLikeCount(likes || 0)

    const { count: comments } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('video_id', video.id)
    setCommentCount(comments || 0)

    if (session?.user) {
      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('video_id', video.id)
        .eq('user_id', session.user.id)
        .maybeSingle()
      setLiked(!!data)
    }
  }

  useEffect(() => { loadCounts() }, [video.id, session])

  const toggleLike = async () => {
    if (!session?.user) return
    if (liked) {
      await supabase.from('likes').delete().eq('video_id', video.id).eq('user_id', session.user.id)
      setLiked(false)
      setLikeCount((n) => Math.max(0, n - 1))
    } else {
      await supabase.from('likes').insert({ video_id: video.id, user_id: session.user.id })
      setLiked(true)
      setLikeCount((n) => n + 1)
    }
  }

  return (
    <div className="slide">
      <video ref={videoRef} src={video.video_url} loop muted playsInline />
      <div className="slide-scrim" />

      <div className="rail">
        <button className={`rail-btn ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          <span className="rail-icon">{liked ? '♥' : '♡'}</span>
          {likeCount}
        </button>
        <button className="rail-btn" onClick={() => setShowComments(true)}>
          <span className="rail-icon">💬</span>
          {commentCount}
        </button>
      </div>

      <div className="slide-info">
        <div className="slide-user">@{video.profiles?.username || 'utilisateur'}</div>
        {video.caption && <div className="slide-caption">{video.caption}</div>}
      </div>

      {showComments && (
        <CommentsSheet videoId={video.id} onClose={() => setShowComments(false)} />
      )}
    </div>
  )
}
