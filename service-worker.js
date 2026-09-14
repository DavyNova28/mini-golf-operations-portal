"use strict";

const CACHE_PREFIX = "mini-golf-operations-portal-";
const CACHE_NAME = `${CACHE_PREFIX}v0.1.7-build-1.7`;
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/portal.css",
  "./js/portal-config.js",
  "./js/portal.js",
  "./version.json",
  "./manifest.webmanifest",
  "./assets/images/JurassiqueLogo.png",
  "./assets/icons/favicon.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/pwa-192.png",
  "./assets/icons/pwa-512.png",
  "./assets/icons/pwa-maskable-512.png"
];

function normalizedCacheKey(request) {
  const url = new URL(request.url);
  url.search = "";
  return new Request(url.toString(), { method: "GET" });
}

async function putResponse(cache, request, response) {
  if (!response || !response.ok || response.type === "opaque") return;
  await cache.put(normalizedCacheKey(request), response.clone());
}

async function networkFirst(request, fallbackUrl = null) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    await putResponse(cache, request, response);
    return response;
  } catch (_) {
    const cached = await cache.match(normalizedCacheKey(request));
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(new URL(fallbackUrl, self.registration.scope).toString(), { ignoreSearch: true });
      if (fallback) return fallback;
    }
    return Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const key = normalizedCacheKey(request);
  const cached = await cache.match(key);
  const networkPromise = fetch(request)
    .then(async (response) => {
      await putResponse(cache, request, response);
      return response;
    })
    .catch(() => null);

  if (cached) {
    networkPromise.catch(() => null);
    return cached;
  }

  return (await networkPromise) || Response.error();
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(CORE_ASSETS.map((asset) => cache.add(asset)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }

  if (/\.(?:png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
