import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

if (!ffmpegPath) {
  console.error("ffmpeg-static não tem binário para esta plataforma.");
  process.exit(1);
}

const result = spawnSync(ffmpegPath, process.argv.slice(2), { stdio: "inherit" });

if (result.error) {
  console.error(`Não foi possível executar FFmpeg: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
