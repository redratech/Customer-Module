const cache = new Map<string, { state?: string; district?: string } | null>();

export async function lookupPincode(pincode: string): Promise<{ state?: string; district?: string } | null> {
  const key = pincode.trim();
  if (key.length !== 6) return null;
  if (cache.has(key)) return cache.get(key) ?? null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${encodeURIComponent(key)}`);
    const json = await res.json();
    if (!Array.isArray(json) || json.length === 0) {
      cache.set(key, null);
      return null;
    }
    const payload = json[0];
    if (payload.Status !== "Success" || !Array.isArray(payload.PostOffice) || payload.PostOffice.length === 0) {
      cache.set(key, null);
      return null;
    }
    const office = payload.PostOffice[0];
    const result = { state: office.State ?? undefined, district: office.District ?? undefined };
    cache.set(key, result);
    return result;
  } catch (err) {
    cache.set(key, null);
    return null;
  }
}

export function clearPincodeCache() {
  cache.clear();
}
