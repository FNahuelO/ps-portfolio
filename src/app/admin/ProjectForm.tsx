import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BG_COLORS,
  createProject,
  updateProject,
  uploadImage,
  type Project,
} from "../../lib/projects";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";

type FormValues = {
  title: string;
  description: string;
  url: string;
  tags: string;
  bg_color: string;
  published: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  nextPosition: number;
  onSaved: () => void;
};

function toFormValues(project: Project | null): FormValues {
  return {
    title: project?.title ?? "",
    description: project?.description ?? "",
    url: project?.url ?? "",
    tags: project?.tags?.join(", ") ?? "",
    bg_color: project?.bg_color ?? BG_COLORS[0].value,
    published: project?.published ?? true,
  };
}

export function ProjectForm({ open, onOpenChange, project, nextPosition, onSaved }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: toFormValues(project) });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    reset(toFormValues(project));
    setFile(null);
    setPreview(project?.image_url ?? "");
  }, [open, project, reset]);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  async function onSubmit(values: FormValues) {
    if (!file && !project?.image_url) {
      toast.error("Subí una imagen para el trabajo.");
      return;
    }
    try {
      const image_url = file ? await uploadImage(file) : project!.image_url;
      const data = {
        title: values.title.trim(),
        description: values.description.trim(),
        url: values.url.trim(),
        tags: values.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        bg_color: values.bg_color,
        published: values.published,
        image_url,
      };
      if (project) {
        await updateProject(project.id, data);
        toast.success("Trabajo actualizado");
      } else {
        await createProject({ ...data, position: nextPosition });
        toast.success("Trabajo creado");
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo guardar el trabajo.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Editar trabajo" : "Nuevo trabajo"}</DialogTitle>
          <DialogDescription>
            Los trabajos publicados aparecen en la sección Proyectos de la home.
          </DialogDescription>
        </DialogHeader>

        <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title", { required: true })} aria-invalid={!!errors.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={3}
              {...register("description", { required: true })}
              aria-invalid={!!errors.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Link del proyecto</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://..."
              {...register("url", { required: true })}
              aria-invalid={!!errors.url}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (separados por coma)</Label>
            <Input id="tags" placeholder="UX Research, UI Design, Web" {...register("tags")} />
          </div>

          <div className="space-y-2">
            <Label>Color de fondo</Label>
            <Controller
              control={control}
              name="bg_color"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BG_COLORS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        <span
                          className="inline-block h-4 w-4 rounded-full border"
                          style={{ backgroundColor: c.swatch }}
                        />
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            {preview && (
              <div className="rounded-2xl overflow-hidden border bg-gray-50 aspect-[4/3]">
                <img src={preview} alt="" className="w-full h-full object-contain" />
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="published">Publicado</Label>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="project-form"
            disabled={isSubmitting}
            className="bg-[#AB9DFF] hover:bg-[#253AB2] text-white"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
