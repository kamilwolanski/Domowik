function getQueryParam(
  param: string,
  url: string = window.location.href,
): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

export default getQueryParam;
