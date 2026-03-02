import { NextResponse } from "next/server";
import { assert } from "@/lib/assert";

const TWITTER_API_BASE = "https://api.x.com/2";
const USERNAME = "SeyiKareem";
const MAX_RESULTS = 100;
const TOP_N = 30;
const CACHE_MAX_AGE = 3600;

interface TweetItem {
  text: string;
  date: string;
}

function stripUrls(text: string): string {
  assert(typeof text === "string", "text must be a string");
  assert(text.length > 0, "text must not be empty");

  return text.replace(/https?:\/\/\S+/g, "").trim();
}

function formatDate(iso: string): string {
  assert(typeof iso === "string", "iso must be a string");
  assert(iso.length > 0, "iso must not be empty");

  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface TweetMetrics {
  like_count: number;
  retweet_count: number;
  reply_count: number;
}

interface TweetData {
  text: string;
  created_at: string;
  public_metrics: TweetMetrics;
}

interface UserResponse {
  data?: { id: string };
}

interface TweetsResponse {
  data?: TweetData[];
}

async function fetchUserId(token: string): Promise<string | null> {
  assert(token.length > 0, "Token must not be empty");
  assert(USERNAME.length > 0, "Username must not be empty");

  const res = await fetch(
    `${TWITTER_API_BASE}/users/by/username/${USERNAME}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    return null;
  }

  const json: UserResponse = await res.json();
  return json.data?.id ?? null;
}

async function fetchTweets(
  token: string,
  userId: string
): Promise<TweetItem[]> {
  assert(token.length > 0, "Token must not be empty");
  assert(userId.length > 0, "userId must not be empty");

  const url = new URL(`${TWITTER_API_BASE}/users/${userId}/tweets`);
  url.searchParams.set("max_results", String(MAX_RESULTS));
  url.searchParams.set("tweet.fields", "public_metrics,created_at");
  url.searchParams.set("exclude", "retweets,replies");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return [];
  }

  const json: TweetsResponse = await res.json();
  const tweets = json.data ?? [];

  const sorted = [...tweets].sort((a, b) => {
    const engA =
      a.public_metrics.like_count +
      a.public_metrics.retweet_count +
      a.public_metrics.reply_count;
    const engB =
      b.public_metrics.like_count +
      b.public_metrics.retweet_count +
      b.public_metrics.reply_count;
    return engB - engA;
  });

  return sorted
    .slice(0, TOP_N)
    .map((t) => ({
      text: stripUrls(t.text),
      date: formatDate(t.created_at),
    }))
    .filter((t) => t.text.length > 0);
}

export async function GET() {
  const token = process.env.TWITTER_BEARER_TOKEN;

  const cacheHeaders = {
    "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}`,
  };

  if (!token || token === "your_twitter_bearer_token_here") {
    return NextResponse.json({ tweets: [] }, { headers: cacheHeaders });
  }

  const userId = await fetchUserId(token);

  if (!userId) {
    return NextResponse.json({ tweets: [] }, { headers: cacheHeaders });
  }

  const tweets = await fetchTweets(token, userId);

  return NextResponse.json({ tweets }, { headers: cacheHeaders });
}
