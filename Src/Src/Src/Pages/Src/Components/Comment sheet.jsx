import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function Upload() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pickFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const publish = async () => {
    if (!file) return
    setBusy(true)
    setError('')
    setProgress(15)

    const path = `${session.user.id}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage.from('videos').upload(path, file)

    if (uploadError) {
      setError("L'envoi a échoué. Vérifie ta connexion et réessaie.")
      setBusy(false)
      return
    }
    setProgress(70)

    const { data: urlData } = supabase.storage.from('videos').getPublicUrl(path)

    const { error: insertError } = await supabase.from('videos').insert({
      user_id: session.user.id,
      video_url: urlData.publicUrl,
      caption,
    })

    if (insertError) {
      setError('Vidéo envoyée, mais la publication a échoué.')
      setBusy(false)
      return
    }

    setProgress(100)
    setTimeout(() => navigate('/'), 300)
  }

  return (
    <div className="upload-screen">
      <h1 className="auth-title" style={{ fontSize: 28 }}>Nouvelle <span>vidéo</span></h1>

      {error && <div className="auth-error">{error}</div>}

      <label className={`dropzone ${file ? 'has-file' : ''}`}>
        <input type="file" accept="video/*" onChange={pickFile} />
        {file ? file.name : 'Touche ici pour choisir une vidéo'}
      </label>

      {preview && <video className="upload-preview" src={preview} controls />}

      <div className="field">
        <label>Légende</label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Décris ta vidéo…"
        />
      </div>

      <button className="btn-primary" disabled={!file || busy} onClick={publish}>
        {busy ? 'Publication…' : 'Publier'}
      </button>

      {busy && (
        <div className="upload-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}
