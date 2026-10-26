#!/usr/bin/env bash
# Membuat narasi PRATINJAU dari remotion/narasi-1.46.json dengan suara macOS
# "Damayanti", lalu mencatat durasinya ke public/audio/vo/durations.json.
#
# Suara sistem macOS hanya boleh untuk pemakaian pribadi non-komersial, jadi
# hasilnya dipakai untuk mengecek isi & tempo saja. Untuk video yang diunggah,
# ganti tiap berkas public/audio/vo/<Konten>/<n>.wav dengan rekaman suara asli
# (nama berkas sama), lalu jalankan skrip ini dengan --durations-only.
set -euo pipefail
cd "$(dirname "$0")"
OUT=public/audio/vo
mkdir -p "$OUT"

if [ "${1:-}" != "--durations-only" ]; then
  python3 - <<'EOF'
import json, os, subprocess
lines = json.load(open('narasi-1.46.json'))
for content, scenes in lines.items():
    os.makedirs(f'public/audio/vo/{content}', exist_ok=True)
    for i, text in enumerate(scenes):
        aiff = f'/tmp/loka-vo-{content}-{i}.aiff'
        subprocess.run(['say', '-v', 'Damayanti', '-r', '192', '-o', aiff, text], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', aiff, '-ar', '48000', '-ac', '1',
                        '-af', 'loudnorm=I=-16:TP=-1.5', f'public/audio/vo/{content}/{i}.wav'], check=True)
        os.remove(aiff)
EOF
fi

python3 - <<'EOF'
import json, os, subprocess
out = {}
for content in sorted(os.listdir('public/audio/vo')):
    d = f'public/audio/vo/{content}'
    if not os.path.isdir(d):
        continue
    files = sorted((f for f in os.listdir(d) if f.endswith('.wav')), key=lambda f: int(f.split('.')[0]))
    out[content] = [float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{d}/{f}'],
                                         capture_output=True, text=True, check=True).stdout) for f in files]
json.dump(out, open('public/audio/vo/durations.json', 'w'), indent=1)
print(json.dumps(out))
EOF
