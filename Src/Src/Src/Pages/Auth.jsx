import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) {
        setError(signUpError.message)
        setBusy(false)
        return
      }
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, username })
        if (profileError) setError("Compte créé, mais le nom d'utilisateur est peut-être déjà pris.")
      }
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) setError(loginError.message)
    }
    setBusy(false)
  }

  return (
    <div className="auth-screen">
      <div className="auth-mark">Réseau vidéo</div>
      <h1 className="auth-title">
        {mode === 'signup' ? <>Rejoins <span>la boucle</span></> : <>Content de te <span>revoir</span></>}
      </h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div className="field">
            <label>Nom d'utilisateur</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: kevin_tech"
              required
              minLength={3}
            />
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button className="btn-primary" disabled={busy} type="submit">
          {busy ? 'Un instant…' : mode === 'signup' ? 'Créer mon compte' : 'Se connecter'}
        </button>
      </form>

      <button className="switch-mode" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
        {mode === 'signup' ? (
          <>Déjà un compte ? <b>Se connecter</b></>
        ) : (
          <>Pas encore de compte ? <b>S'inscrire</b></>
        )}
      </button>
    </div>
  )
}
