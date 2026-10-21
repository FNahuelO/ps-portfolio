-- Ejecutar en Supabase Dashboard > SQL Editor.

-- Tabla de proyectos
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text not null default '',
  tags text[] not null default '{}',
  bg_color text not null default 'bg-[#C0E0FF]/30',
  url text not null default '',
  position int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read" on public.projects
  for select to anon
  using (published = true);

drop policy if exists "projects_admin_read" on public.projects;
create policy "projects_admin_read" on public.projects
  for select to authenticated
  using (true);

drop policy if exists "projects_admin_insert" on public.projects;
create policy "projects_admin_insert" on public.projects
  for insert to authenticated
  with check (true);

drop policy if exists "projects_admin_update" on public.projects;
create policy "projects_admin_update" on public.projects
  for update to authenticated
  using (true) with check (true);

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete" on public.projects
  for delete to authenticated
  using (true);

-- Colores guardados desde el panel (paleta personalizada)
create table if not exists public.saved_colors (
  id uuid primary key default gen_random_uuid(),
  hex text not null unique,
  created_at timestamptz not null default now()
);

alter table public.saved_colors enable row level security;

drop policy if exists "saved_colors_admin_all" on public.saved_colors;
create policy "saved_colors_admin_all" on public.saved_colors
  for all to authenticated
  using (true) with check (true);

-- Bucket de imágenes
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "project_images_public_read" on storage.objects;
create policy "project_images_public_read" on storage.objects
  for select
  using (bucket_id = 'project-images');

drop policy if exists "project_images_admin_insert" on storage.objects;
create policy "project_images_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "project_images_admin_update" on storage.objects;
create policy "project_images_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "project_images_admin_delete" on storage.objects;
create policy "project_images_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-images');

-- Datos iniciales (proyectos que estaban hardcodeados)
insert into public.projects (title, description, image_url, tags, bg_color, url, position)
select * from (values
  (
    'Trabajo Ya',
    'Plataforma de empleo en Argentina que conecta personas y empresas de forma simple, rápida y 100% digital.',
    '/trabajoya.png',
    array['UX Research', 'UI Design', 'Mobile', 'Dashboard'],
    'bg-[#C0E0FF]/30',
    'https://web.trabajo-ya.com',
    0
  ),
  (
    'CEPPA',
    'Diseño completo de plataforma web y mobile para el Centro de Psicoterapias.',
    '/ceppa.png',
    array['Dashboard', 'Web'],
    'bg-[#FFB2F7]/20',
    'https://ceppa.com.ar',
    1
  ),
  (
    'Sistema de Gestión de Citas',
    'Plataforma completa de gestión de citas con app móvil y panel administrativo web.',
    '/barberia.png',
    array['Dashboard', 'Web'],
    'bg-[#B8A2FF]/20',
    'https://www.figma.com/design/wbWjZJPCE1RmK1ehpjCnGx/Gestionador-de-Citas-Barberia?node-id=0-1&p=f&t=RWtoda1MvCF6p5F4-0',
    2
  )
) as seed(title, description, image_url, tags, bg_color, url, position)
where not exists (select 1 from public.projects);
