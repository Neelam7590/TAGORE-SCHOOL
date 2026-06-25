---
name: Home page color flow
description: The 11-section alternating color system used in Home.tsx.
---

The homepage uses a deliberate color flow with diagonal clip-path transitions (-80px overlap):

| Section | Name | Background |
|---------|------|------------|
| S1 | Hero | Royal Blue (#0F4C81) |
| S2 | Welcome | Pure White |
| S3 | Principal Message | Light Blue gradient (from-[#EEF4FF] via-[#F0F6FF] to-[#F5F9FF]) |
| S4 | Academic Programs | Royal Blue (#0F4C81) |
| S5 | Kindergarten | Soft Gold Tint (linear-gradient #FFFBEE → #FFF8E1 → #FFFDF0) |
| S6 | Why Choose Us | Pure White (colorful gradient cards) |
| S7 | Facilities Preview | Light Blue gradient (from-[#EEF4FF] via-[#E8F0FE] to-[#F0F6FF]) |
| S8 | Gallery Preview | Royal Blue (#0F4C81) |
| S9 | Testimonials | Pure White |
| S10 | Quick Access | Light Blue gradient (same as S7) |
| S11 | CTA | Royal Blue gradient |

**Why:** Alternating Royal Blue / White / Light Blue / Gold creates visual rhythm without monotony. Gold tint for Kindergarten reinforces the childhood/warmth brand feel.

**How to apply:** Maintain this alternating pattern for any new homepage sections. Never put two identical bg colors adjacent. Always use clipPath polygon + -80px marginTop for seamless transitions.
