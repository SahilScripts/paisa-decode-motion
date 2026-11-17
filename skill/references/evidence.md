# Reference evidence and coverage

Study date: 16 November 2026 (Asia/Kolkata). Sources were downloaded and decoded locally.

| Reference | Native source | Full frames measured | Dense visual intervals (seconds) | Dense frames viewed |
|---|---|---:|---|---:|
| [Coaching Se Crorepati? Ek Student Ki Fees Pe Asli Mein Kitna Bachta Hai](https://www.youtube.com/watch?v=FjPuSavm3NY) | 1280×720, 60 fps | 46,041 | 0–3, 120–123, 150–158, 176–180, 380–383, 650–653 | 1,440 |
| [₹1 Lakh/Month Cloud Kitchen? Ek Biryani Pe Asli Mein Kitna Bachta Hai](https://www.youtube.com/watch?v=yDKd0mB7wAk) | 1920×1080, 60 fps | 45,235 | 0–3, 120–123, 156–159, 380–383, 650–653 | 900 |
| [₹30 Ka Paani Ka Jar: Water Plant Owner Ke Paas Asli Mein Kitna Bachta Hai?](https://www.youtube.com/watch?v=mHCYU1HJTUw) | 1920×1080, 60 fps | 38,408 | 0–3, 6–9, 120–123, 380–383, 600–603 | 900 |

**129,684 frames measured locally; 3,240 consecutive frames visually inspected at 60 fps in selected windows**, plus 272 overview frames sampled every 8 seconds across all three full lengths.

The dense sheets contain every successive frame of the specified intervals. They were inspected with the local image viewer. Native 60 fps was verified with FFprobe. No motion interpolation or cloud vision was used. Thumbnail inspection establishes composition and visible temporal changes; it does not recover exact project easing, full-resolution typography, shutter settings or continuous playback quality.

**Scope limitation:** this is a full-video computational pass with targeted visual frame analysis, not a claim that all 129,684 images were individually semantically reviewed. Intervals outside the listed windows have only metrics and sparse overview inspection.

The full workspace project stores originals under sources/, per-frame JSONL, consecutive sheets, overviews, review.html and source hashes under analysis/<video-id>/. analysis/coverage.json contains machine-readable provenance. Source videos and contact sheets are excluded from the portable skill archive.

Vertex received extracted audio only: the first 45 seconds of each reference and the final 30-second demo for transcription. Audio-model notes are unverified reports, not direct listening by the local agent. Model segment timestamps are coarse and cannot establish frame-accurate AV sync.

All three intros contrast a visible unit/earning with a smaller remaining amount and move into a specific scenario. For the demo, that pattern is adapted to an explicitly illustrative tea-stall example. The reference business numbers are not reused as factual claims.

The skill was validated structurally and exercised by building/rendering the included 30-second template. No independent forward-test or comparison study was performed. It should not be described as universally benchmarked.
