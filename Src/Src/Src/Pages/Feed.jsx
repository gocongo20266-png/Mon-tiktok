import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'
import VideoSlide from '../components/VideoSlide'

export default function Feed() {
  const { signOut } = useAuth()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('videos')
      .select('id, video_url, caption, created_at, profiles(username)')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setVideos(data || [])
        setLoading(false)
      })
  }, [])

  if (loading) return null

  if (videos.length === 0) {
    return (
      <div className="empty-feed">
        <h2 className="auth-title">Rien à voir <span>pour l'instant</span></h2>
        <p>Va dans l'onglet "Ajouter" pour publier la première vidéo.</p>
      </div>
    )
  }

  return (
    <div className="feed">
      <div className="topbar">
        Mon<span>Loop</span>
      </div>
      <button className="signout-link" onClick={signOut}>Déconnexion</button>
      {videos.map((v) => (
        <VideoSlide key={v.id} video={v} />
      ))}
    </div>
  )
}
