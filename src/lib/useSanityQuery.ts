import { useEffect, useState } from "react";
import { client } from "./sanity";

export function useSanityQuery<T>(query: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    client.fetch<T>(query).then(
      (result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Sanity query failed:", error);
        if (!cancelled) setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, loading };
}
