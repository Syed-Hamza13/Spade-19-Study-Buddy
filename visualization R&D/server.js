import express from 'express';
import fetch from 'node-fetch'; // if Node<18, else global fetch hai
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// CORS (agar alag origin)
app.use((req,res,next)=>{ 
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
});

app.post('/api/generate', async (req,res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  // 👇 Gemini prompt design: ask for answer + visual_code (p5) OR visual_json
  const system = `
You are an AI tutor for JEE Physics/Maths. 
Return JSON with keys:
- answer: short, stepwise explanation to the student (HTML-safe text).
- visual_code: a FULL p5.js sketch (setup/draw) OR leave empty if not needed.
- visual_json: if visual_code is empty, return a JSON scene describing visualization.
Rules:
- Prefer visual_code for motion/animation.
- If using JSON, ensure fields: display.canvas, objects[], rules[].
- Keep code self-contained (no external assets).
  `.trim();

  // ----- Replace with the actual Gemini endpoint you use -----
  // Example for Google Generative Language API (Gemini 1.5):
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try{
    const geminiResp = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: system + "\n\nUser: " + prompt }]}]
      })
    });
    const json = await geminiResp.json();

    // ---- Parse the Gemini response text to extract JSON payload ----
    // NOTE: Gemini often returns text; you may need to parse fenced code blocks.
    const text = JSON.stringify(json);
    // TODO: robust parsing — for demo, we'll return a safe fallback if parsing fails.

    // Fallback demo if parsing is tricky:
    const fallback = {
      answer: `I'll show projectile motion for your prompt: <b>${escapeHtml(prompt)}</b>`,
      visual_code:
`let t=0, v0=28, theta=40*Math.PI/180, g=9.8, S=11;
function setup(){ createCanvas(1000,600); textFont('system-ui'); }
function draw(){
  background(13,20,45);
  stroke(220,120); line(40,height-60,width-20,height-60); line(60,height-20,60,20);
  t += deltaTime/1000;
  const vx = v0*Math.cos(theta), vy0=v0*Math.sin(theta);
  const x = vx*t, y = vy0*t - 0.5*g*t*t;
  noFill(); stroke(255,120,140); beginShape();
  for(let tt=0; tt<=t; tt+=0.02){
    const xx=vx*tt, yy=vy0*tt-0.5*g*tt*tt; vertex(100+xx*S,520-yy*S); if(yy<0) break;
  } endShape();
  noStroke(); fill(80,160,255); circle(100+x*S, 520-y*S, 16);
  if(520-y*S>520){ t=0; }
  fill(230); textSize(16); text('Generated demo (fallback)', 20, 24);
}`
    };

    // TODO: replace with parsed object from Gemini
    res.json(fallback);

  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'AI call failed', details: String(e) });
  }
});

app.use(express.static('.')); // serve index.html

const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log('Server running on http://localhost:'+PORT));

// helper
function escapeHtml(s=''){ return s.replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
