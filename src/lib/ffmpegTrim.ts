// lib/ffmpegTrim.ts

const ffmpegCore = await import("@ffmpeg/ffmpeg");
const { createFFmpeg, fetchFile } = ffmpegCore as any;

const ffmpeg = createFFmpeg({ log: true });

export async function trimVideo(
  file: File,
  startTime: number,
  duration: number
): Promise<string> {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));

  await ffmpeg.run(
    "-ss", `${startTime}`,
    "-t", `${duration}`,
    "-i", "input.mp4",
    "-c", "copy",
    "output.mp4"
  );

  const data = ffmpeg.FS("readFile", "output.mp4");
  const blob = new Blob([data.buffer], { type: "video/mp4" });

  return URL.createObjectURL(blob);
}
