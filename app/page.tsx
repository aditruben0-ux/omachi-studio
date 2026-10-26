'use client'
import { useState } from 'react'

export default function OmachiStudio() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [loading, setLoading] = useState('')

  const generateImage = () => {
    if (!prompt) return
    setLoading('image')
    const url = `https://image.pollinations.ai/p/${encodeURIComponent(prompt + ', japanese temple, ukiyo-e, cinematic')}?width=1024&height=1024&nologo=true&seed=${Date.now()}`
    setImages(p => [url, ...p])
    setTimeout(() => setLoading(''), 2500)
  }

  const generateVideo = () => {
    if (!prompt) return
    setLoading('video')
    const url = `https://gen.pollinations.ai/video/${encodeURIComponent(prompt + ' smooth cinematic temple motion')}?model=ltx-video&nologo=true`
    setVideos(p => [url, ...p])
    setTimeout(() => setLoading(''), 2500)
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0a', color:'#f5f2ed', fontFamily:'Georgia, serif'}}>
      <div style={{maxWidth:'900px', margin:'0 auto', padding:'20px'}}>
        <header style={{textAlign:'center', padding:'50px 0 30px', borderBottom:'1px solid #2a2a2a'}}>
          <h1 style={{fontSize:'42px', letterSpacing:'12px', margin:0}}>OMACHI</h1>
          <div style={{fontSize:'12px', letterSpacing:'8px', opacity:0.6, marginTop:'5px'}}>STUDIO</div>
          <p style={{marginTop:'25px', fontStyle:'italic', opacity:0.8, letterSpacing:'1px'}}>Imagine it. We'll paint it.</p>
        </header>

        <div style={{margin:'40px 0', background:'#151515', padding:'24px', borderRadius:'16px', border:'1px solid #2a2a2a'}}>
          <textarea
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
            placeholder="Describe your temple vision... e.g., Ancient Japanese temple at sunset with cherry blossoms, misty mountains"
            style={{width:'100%', minHeight:'100px', background:'#0a0a0a', border:'1px solid #333', borderRadius:'12px', color:'white', padding:'16px', fontSize:'16px'}}
          />
          <div style={{display:'flex', gap:'12px', marginTop:'16px'}}>
            <button onClick={generateImage} style={{flex:1, background:'#f5f2ed', color:'black', border:'none', padding:'14px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
              {loading==='image'?'Generating...':'Generate Image'}
            </button>
            <button onClick={generateVideo} style={{flex:1, background:'#8b0000', color:'white', border:'none', padding:'14px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
              {loading==='video'?'Generating...':'Generate Video'}
            </button>
          </div>
        </div>

        {videos.length>0 && (
          <div style={{marginBottom:'40px'}}>
            <h3 style={{letterSpacing:'4px', fontSize:'12px', opacity:0.6}}>VIDEOS</h3>
            <div style={{display:'grid', gap:'16px', marginTop:'16px'}}>
              {videos.map((v,i)=>(
                <video key={i} src={v} controls autoPlay muted loop style={{width:'100%', borderRadius:'12px', border:'1px solid #2a2a2a'}} />
              ))}
            </div>
          </div>
        )}

        {images.length>0 && (
          <div>
            <h3 style={{letterSpacing:'4px', fontSize:'12px', opacity:0.6}}>IMAGES</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'16px'}}>
              {images.map((img,i)=>(
                <img key={i} src={img} style={{width:'100%', borderRadius:'12px', border:'1px solid #2a2a2a'}} />
              ))}
            </div>
          </div>
        )}

        {images.length===0 && videos.length===0 && (
          <div style={{textAlign:'center', opacity:0.3, marginTop:'60px'}}>
            <div style={{fontSize:'60px'}}>⛩️</div>
            <p>Your gallery awaits</p>
          </div>
        )}
      </div>
    </div>
  )
  }
