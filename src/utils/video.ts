/** Build a YouTube embed URL that autoplays (muted required by browsers). */
export function youtubeAutoplayUrl(url: string): string {
  try {
    const u = new URL(url)
    u.searchParams.set('autoplay', '1')
    u.searchParams.set('mute', '1')
    u.searchParams.set('playsinline', '1')
    u.searchParams.set('rel', '0')
    if (!u.searchParams.has('loop')) u.searchParams.set('loop', '1')
    // Loop needs playlist=videoId for YouTube embeds
    const parts = u.pathname.split('/')
    const id = parts[parts.length - 1]
    if (id && !u.searchParams.has('playlist')) {
      u.searchParams.set('playlist', id)
    }
    return u.toString()
  } catch {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}autoplay=1&mute=1&playsinline=1&rel=0`
  }
}
