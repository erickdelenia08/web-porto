import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function useSupabaseVideo(bucket, path, isPrivate = false) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!path) return

    const fetchUrl = async () => {
      if (isPrivate) {
        const { data, error } = await supabase
          .storage
          .from(bucket)
          .createSignedUrl(path, 3600) // 1 jam
        if (!error) setUrl(data.signedUrl)
      } else {
        const { data } = supabase.storage.from(bucket).getPublicUrl(path)
        setUrl(data.publicUrl)
      }
    }

    fetchUrl()
  }, [bucket, path, isPrivate])

  return url
}
