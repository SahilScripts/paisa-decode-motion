# Demo review

Delivered: output/chai-demo-30s.mp4. Original illustrative tea-stall calculation; no copied
source-channel assets. Synthetic Hindi narration: Edge hi-IN-MadhurNeural. Original local
music (100 BPM) and sound effects. Vertex received only an extracted audio track for checking
the transcript. Its coarse timestamps and incidental sound descriptions are model reports,
not direct listening or a frame-accurate alignment measurement.

## Corrected during the build

- 5–9.3 s: the first 100-cup grid extended below the canvas. Reduced each cup to 42 px and
  adjusted grid spacing; all ten rows now fit. The full-resolution export check then found that the final row still touched the footer, so the grid was moved 35 px upward. The ₹2,000 coin was also moved left to keep the receipt caption unobscured. Revenue still derives from the same integer
  cup count, so count × price = displayed sales throughout the reveal.
- 0–5 s: cart wheels reached the footer. Scaled the cart to 88% and moved/scaled its kettle
  to the counter. Confirmed clearance in the decoded export.
- First narration draft exceeded the beat windows. Shortened the wording and regenerated
  the six clips. After trimming edge silence, all delivered clips fit without additional
  atempo compression. The final phrase finishes around 27.04 s, leaving a readable end hold.

## Verified

- Rendered from the standalone project without changing the existing film entry point.
- Structural skill validation passed; all Python helpers compile.
- FFprobe decoded count: 1,800 frames, 60/1 nominal and average rate, H.264, yuv420p,
  1920×1080, 30.000-second video timeline. AAC stereo at 48 kHz. The audio/container
  duration is 30.016 seconds due to AAC packet padding.
- All 1,800 decoded video frames inspected in 30 consecutive local sheets. Larger stills
  inspected across all six scenes; start, end and every scene boundary are included. After
  the final sales-layout revision, all 9 changed decoded sheets were re-inspected; the
  remaining 21 sheets were byte-identical to their reviewed versions.
- Local metrics/summary and source hash saved in qa/. No claim that thumbnail inspection
  recovers normal-speed playback quality.
- Mixed audio measures mean -18.7 dBFS and maximum -1.9 dBFS after AAC encoding. The actual
  mix contains voice, music and effects. No digital clipping was measured.
- Audio-only transcription of the exported mix includes the intended numbers: 20, 100,
  2000, 8, 1200, 500 and 700, plus labour/tax caveat and closing question.
- Arithmetic: 100 × ₹20 = ₹2,000; inputs 100 × (5+1+1+1) = ₹800; overhead 250+150+100 =
  ₹500; remainder ₹700. Both the persistent illustrative label and excluded labour/tax/setup
  costs are visible. The remainder is not called final net profit.

## Not verified

The agent did not watch continuous real-time playback or directly listen to the final mix.
Visual review used consecutive decoded images; audio review used local measurements and
audio-only transcription. Audio taste, pronunciation nuance, perceived rhythm and perfect
AV sync remain for human playback review. This is a rendered, frame-checked demo, not a
claim of an independent creative benchmark or full audiovisual listening review.
