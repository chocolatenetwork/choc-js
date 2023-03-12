export function makeTweetUrl(tweet: string) {
  const copyParams = new URLSearchParams({ text: tweet });
  const tweetUrl = `https://twitter.com/intent/tweet?${copyParams}`;
  return tweetUrl;
}
