const config = {
  APPLE_MUSIC: {
    API_AUTH_KEY: process.env.APPLE_API_AUTH_KEY as string,
    API_KEY_ID: process.env.APPLE_API_KEY_ID as string,
    API_REQUEST_LIMIT: 20,
    API_TEAM_ID: process.env.APPLE_API_TEAM_ID as string,
    API_TOKEN_ALGORITHM: 'ES256',
    API_URL: 'https://api.music.apple.com/v1/',
    DEFAULT_STORE: 'es',
    ID: 'apple-music',
    MEDIA_TYPE: 'audio',
    NAME: 'Apple Music',
    SONG_URL_HOST: 'music.apple.com',
    SONG_URL_PATTERN: /https:\/\/music.apple.com\/es\/album\/(?<albumName>.[^/]*)\/(?<albumId>\d+)\?i=(?<songId>\d+)/
  },
  MUSIXMATCH: {
    API_KEY: process.env.MUSIXMATCH_API_KEY as string,
    ID: 'musixmatch',
    MEDIA_TYPE: 'lyrics',
    NAME: 'Musixmatch',
    SONG_URL_HOST: 'www.musixmatch.com',
    SONG_URL_PATTERN: /https:\/\/www.musixmatch.com\/lyrics\/(?<artistName>[A-Za-z0-9-]+)\/(?<songName>[A-Za-z0-9-]+)/
  },
  SPOTIFY: {
    API_CLIENT_ID: process.env.SPOTIFY_API_CLIENT_ID as string,
    API_CLIENT_SECRET: process.env.SPOTIFY_API_CLIENT_SECRET as string,
    ID: 'spotify',
    MEDIA_TYPE: 'audio',
    NAME: 'Spotify',
    SONG_URL_HOST: 'open.spotify.com',
    SONG_URL_PATTERN: /https:\/\/open.spotify.com\/track\/(?<songId>[A-Za-z0-9]+)/
  },
  YOUTUBE: {
    API_KEY: process.env.YOUTUBE_API_KEY as string,
    API_REQUEST_LIMIT: 20,
    ID: 'youtube',
    MEDIA_TYPE: 'video',
    NAME: 'YouTube',
    SONG_BASE_URL: 'https://www.youtube.com/watch?v=',
    SONG_URL_HOST: 'www.youtube.com',
    SONG_URL_PATTERN: /https:\/\/www.youtube.com\/watch\?v=(?<songId>[A-Za-z0-9-_]+)/
  },
  YOUTUBE_MUSIC: {
    ID: 'youtube-music',
    MEDIA_TYPE: 'audio',
    NAME: 'YouTube Music',
    SONG_BASE_URL: 'https://music.youtube.com/watch?v=',
    SONG_URL_HOST: 'music.youtube.com',
    SONG_URL_PATTERN: /https:\/\/music.youtube.com\/watch\?v=(?<songId>[A-Za-z0-9-_]+)&list=(?<listId>[A-Za-z0-9-_]+)/
  }
}

export default config
