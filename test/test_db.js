import { createClient } from "@supabase/supabase-js";

import 'dotenv/config'

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
try {
  const { data, error } = await supabase
    .from("motion_graphics_projects")
    .select("*");
  if (error) throw error;

//   Dapatkan URL publik untuk video & thumbnail
  const projectsWithUrls = await Promise.all(
    data.map(async (project) => {
      const { data: thumbData } = supabase.storage
        .from("images")
        .getPublicUrl(project.thumbnail_path);
      const { data: videoData } = supabase.storage
        .from("videos")
        .getPublicUrl(project.video_path);

      return {
        ...project,
        thumbnailUrl: thumbData.publicUrl,
        videoUrl: videoData.publicUrl,
      };
    })
  );

  console.log(projectsWithUrls);
  
} catch (err) {
  console.error("Error loading projects:", err);
}
