#!/usr/bin/env bash
# Mengunduh musik & efek suara untuk video Update 1.46 dari Mixkit
# (Mixkit Stock Music / Sound Effects Free License: boleh untuk media sosial
# dan iklan online, tanpa atribusi). Berkasnya TIDAK di-commit karena repo ini
# publik dan lisensinya melarang menyebarkan berkas mentahnya.
set -euo pipefail
cd "$(dirname "$0")/public/audio"
mkdir -p mixkit
get() { [ -s "mixkit/$1" ] || curl -sfL -A "Mozilla/5.0" -o "mixkit/$1" "$2"; }

# Musik
get golden-storm.mp3 https://assets.mixkit.co/music/470/470.mp3        # Golden Storm — Diego Nava (EDM)
get karma.mp3        https://assets.mixkit.co/music/1183/1183.mp3      # Karma — Michael Ramir C. (EDM)
get trap-electro.mp3 https://assets.mixkit.co/music/126/126.mp3        # Trap Electro Vibes — Alejandro Magaña (Trap)

# Efek suara
get whoosh.mp3       https://assets.mixkit.co/active_storage/sfx/1490/1490-preview.mp3   # Fast whoosh transition
get whoosh-big.mp3   https://assets.mixkit.co/active_storage/sfx/1492/1492-preview.mp3   # Cinematic whoosh fast transition
get impact.mp3       https://assets.mixkit.co/active_storage/sfx/772/772-preview.mp3     # Quick zoom impact
get logo-hit.mp3     https://assets.mixkit.co/active_storage/sfx/2900/2900-preview.mp3   # Movie logo intro impact
get pop.mp3          https://assets.mixkit.co/active_storage/sfx/2364/2364-preview.mp3   # Hard pop click
get tick.mp3         https://assets.mixkit.co/active_storage/sfx/2356/2356-preview.mp3   # Dry pop up notification
get ding.mp3         https://assets.mixkit.co/active_storage/sfx/2357/2357-preview.mp3   # Bubble pop up alert
ls -la mixkit
