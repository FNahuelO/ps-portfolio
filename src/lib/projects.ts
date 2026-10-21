import { supabase } from "./supabase";

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  bg_color: string;
  url: string;
  position: number;
  published: boolean;
  created_at: string;
};

export type ProjectInput = Omit<Project, "id" | "created_at">;

export const BG_COLORS = [
  { value: "bg-[#C0E0FF]/30", label: "Celeste", swatch: "#C0E0FF" },
  { value: "bg-[#FFB2F7]/20", label: "Rosa", swatch: "#FFB2F7" },
  { value: "bg-[#B8A2FF]/20", label: "Lila", swatch: "#B8A2FF" },
  { value: "bg-[#AB9DFF]/20", label: "Violeta", swatch: "#AB9DFF" },
];

const BUCKET = "project-images";

/** Con sesión de admin devuelve también los no publicados (lo filtra RLS). */
export async function listProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function listPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const { data, error } = await supabase.from("projects").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, patch: Partial<ProjectInput>): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(project: Project): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", project.id);
  if (error) throw error;
  const path = storagePath(project.image_url);
  if (path) await supabase.storage.from(BUCKET).remove([path]);
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
  });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function storagePath(publicUrl: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = publicUrl.indexOf(marker);
  return i === -1 ? null : publicUrl.slice(i + marker.length);
}
