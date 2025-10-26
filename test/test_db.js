import { createClient } from "@supabase/supabase-js";

import "dotenv/config";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
try {
  const { data, error } = await supabase.from("it_projects").select("*");
  if (error) throw error;

  // Dapatkan URL publik untuk video & thumbnail
  const projectsWithUrls = await Promise.all(
    data.map(async (project) => {
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl('project.jpg');
        console.log('ini lo');
        
        console.log(publicUrl);
        
      project.image_url = publicUrl;
      return {
        project,
      };
    })
  );

  console.log(projectsWithUrls);
} catch (err) {
  console.error("Error loading projects:", err);
}
