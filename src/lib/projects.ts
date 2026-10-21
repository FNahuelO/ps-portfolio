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
  { value: "bg-[#C0E0FF]/30", label: "Celeste" },
  { value: "bg-[#FFB2F7]/20", label: "Rosa" },
  { value: "bg-[#B8A2FF]/20", label: "Lila" },
  { value: "bg-[#AB9DFF]/20", label: "Violeta" },
];

/**
 * `bg_color` admite el formato heredado `bg-[#RRGGBB]/NN` (opacidad en %)
 * o un hex plano `#RRGGBB` elegido con el picker.
 */
export function parseColor(value: string): { hex: string; alpha: number } {
  const legacy = value.match(/^bg-\[(#[0-9a-fA-F]{6})\](?:\/(\d{1,3}))?$/);
  if (legacy) return { hex: legacy[1].toUpperCase(), alpha: legacy[2] ? Number(legacy[2]) / 100 : 1 };
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return { hex: value.toUpperCase(), alpha: 1 };
  return { hex: "#C0E0FF", alpha: 0.3 };
}

export function colorToCss(value: string): string {
  const { hex, alpha } = parseColor(value);
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export async function listSavedColors(): Promise<string[]> {
  const { data, error } = await supabase
    .from("saved_colors")
    .select("hex")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((c) => c.hex);
}

export async function saveColor(hex: string): Promise<void> {
  const { error } = await supabase
    .from("saved_colors")
    .upsert({ hex: hex.toUpperCase() }, { onConflict: "hex", ignoreDuplicates: true });
  if (error) throw error;
}

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
