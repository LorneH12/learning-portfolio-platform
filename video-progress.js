// Resume is a bookmark, not a completion gate. Playback always starts paused.
export function bindVideoProgress(video, state, lessonId, persist) {
  const desired = Number(state.videoTimes?.[lessonId]) || 0;
  let restored = false, lastSaved = -1;
  const remember = (force = false) => {
    if (!restored || !Number.isFinite(video.currentTime)) return;
    state.videoTimes ??= {};
    state.videoTimes[lessonId] = video.currentTime;
    const second = Math.floor(video.currentTime);
    if (force || second !== lastSaved) { lastSaved = second; persist(); }
  };
  video.addEventListener('loadedmetadata', () => {
    const end = Number.isFinite(video.duration) ? video.duration : desired;
    video.currentTime = Math.max(0, Math.min(desired, end));
    restored = true;
  }, { once: true });
  video.addEventListener('timeupdate', () => remember());
  video.addEventListener('pause', () => remember(true));
  video.addEventListener('seeked', () => remember(true));
  video.addEventListener('ended', () => remember(true));
  return () => remember(true);
}
