/**
 * Asynchronously fetches a resource from the given URL with retries if the request fails.
 * @param url The URL of the resource to fetch.
 * @param maxRetries The maximum number of times to retry the request before giving up.
 * @returns A promise that resolves with the Response object if the request is successful.
 * @throws An error if the request fails after the maximum number of retries.
 */

const fetchWithRetry = async (url: string, maxRetries = 3): Promise<Response> => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response;
    } else {
      console.log(`Fetch failed with status`);
      throw new Error(`Fetch failed with status`);
    }
  } catch (err) {
    if (maxRetries > 0) {
      console.warn(`Fetch failed, retrying (${maxRetries} retries left)...`);
      return await fetchWithRetry(url, maxRetries - 1);
    } else {
      throw err;
    }
  }
}

/**
 * Asynchronously retrieves and caches an audio file from the given URL.
 * @param soundUrl The URL of the audio file to retrieve and cache.
 * @returns A promise that resolves with the URL of the cached audio file.
 */

const cacheSound = async (soundUrl:string) => {
  const url = await fetchWithRetry(soundUrl);
  const arrayBuffer = await url.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  return URL.createObjectURL(blob);
}

/**
 * Asynchronously generates URLs for audio files and caches them.
 * @param soundUrls An array of URLs for the audio files to cache.
 * @yields A promise that resolves with the URL of each cached audio file.
 */

async function* soundUrlGenerator(soundUrls: string[]) {
  for (const url of soundUrls) {
    yield cacheSound(url);
  }
}

/**
 * Asynchronously loads a set of audio files from the given URLs and returns an array of their cached URLs.
 * @param soundUrls An array of URLs for the audio files to load.
 * @returns A promise that resolves with an array of the URLs of the cached audio files.
 */

export const loadSounds = async (soundUrls: string[]) => {
  const soundsArray = [];
  for await (const cached of soundUrlGenerator(soundUrls)) {
    soundsArray.push(cached);
  }
  return soundsArray;
}