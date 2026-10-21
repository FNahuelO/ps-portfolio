import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowUp, ExternalLink, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { deleteProject, listProjects, updateProject, type Project } from "../../lib/projects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Switch } from "../components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ProjectForm } from "./ProjectForm";

export function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [toDelete, setToDelete] = useState<Project | null>(null);

  const load = useCallback(async () => {
    try {
      setProjects(await listProjects());
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar los trabajos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setFormOpen(true);
  }

  async function togglePublished(project: Project, published: boolean) {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, published } : p)));
    try {
      await updateProject(project.id, { published });
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar el estado.");
      load();
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const changed = reordered
      .map((p, position) => ({ ...p, position }))
      .filter((p, i) => projects.find((o) => o.id === p.id)?.position !== i);
    setProjects(reordered.map((p, position) => ({ ...p, position })));
    try {
      await Promise.all(changed.map((p) => updateProject(p.id, { position: p.position })));
    } catch (err) {
      console.error(err);
      toast.error("No se pudo reordenar.");
      load();
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteProject(toDelete);
      toast.success("Trabajo eliminado");
      setProjects((prev) => prev.filter((p) => p.id !== toDelete.id));
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el trabajo.");
    } finally {
      setToDelete(null);
    }
  }

  const nextPosition = projects.length
    ? Math.max(...projects.map((p) => p.position)) + 1
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-[#C0E0FF]/30">
        <div className="container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="h-10 w-10 rounded-2xl shadow-lg" aria-hidden />
            <span className="text-lg hidden sm:block">Panel admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/" target="_blank">
                Ver sitio
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl">Trabajos</h1>
            <p className="text-sm text-gray-500">
              Gestioná los proyectos que se muestran en la home.
            </p>
          </div>
          <Button
            onClick={openNew}
            className="bg-[#AB9DFF] hover:bg-[#253AB2] text-white rounded-full shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Nuevo trabajo
          </Button>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="p-10 text-center text-gray-500 text-sm">
              Todavía no hay trabajos. Creá el primero con "Nuevo trabajo".
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Orden</TableHead>
                  <TableHead className="w-24">Imagen</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                  <TableHead className="w-28">Publicado</TableHead>
                  <TableHead className="w-28 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => move(index, -1)}
                          aria-label="Subir"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === projects.length - 1}
                          onClick={() => move(index, 1)}
                          aria-label="Bajar"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`${project.bg_color} rounded-lg h-12 w-16 overflow-hidden`}>
                        <img src={project.image_url} alt="" className="h-full w-full object-contain" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{project.title}</div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#AB9DFF] hover:underline"
                      >
                        Ver proyecto
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(project.tags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#C0E0FF]/40 text-[#253AB2] rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={project.published}
                        onCheckedChange={(checked) => togglePublished(project, checked)}
                        aria-label="Publicado"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(project)}
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setToDelete(project)}
                        aria-label="Eliminar"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <ProjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        project={editing}
        nextPosition={nextPosition}
        onSaved={load}
      />

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar "{toDelete?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El trabajo dejará de mostrarse en la home.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
