import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BG_COLORS,
  colorToCss,
  createProject,
  listSavedColors,
  parseColor,
  saveColor,
  updateProject,
  uploadImage,
  type Project,
} from "../../lib/projects";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
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
  onSaved: (project: Project) => void;
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: toFormValues(project) });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [saveNewColor, setSaveNewColor] = useState(false);

  const bgColor = watch("bg_color");
  const isNewColor =
    !BG_COLORS.some((c) => c.value === bgColor) && !savedColors.includes(bgColor);

  useEffect(() => {
    if (!open) return;
    reset(toFormValues(project));
    setFile(null);
    setPreview(project?.image_url ?? "");
    setSaveNewColor(false);
    listSavedColors()
      .then(setSavedColors)
      .catch((err) => console.error(err));
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
    let step = "subir la imagen";
    try {
      const image_url = file ? await uploadImage(file) : project!.image_url;
      if (isNewColor && saveNewColor) {
        step = "guardar el color";
        await saveColor(values.bg_color);
      }
      step = "guardar el trabajo";
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
      const saved = project
        ? await updateProject(project.id, data)
        : await createProject({ ...data, position: nextPosition });
      toast.success(project ? "Trabajo actualizado" : "Trabajo creado");
      onSaved(saved);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      const message = err instanceof Object && "message" in err ? String(err.message) : String(err);
      toast.error(`No se pudo ${step}: ${message}`);
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

        <form id="project-form" onSubmit={handleSubmit(onSubmit, () =>
            toast.error("Completá título, descripción y link del proyecto."),
          )} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title", { required: true })} aria-invalid={!!errors.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={3}
              className="max-h-64 overflow-y-auto"
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
              render={({ field }) => {
                const options = [
                  ...BG_COLORS,
                  ...savedColors.map((hex) => ({ value: hex, label: hex })),
                ];
                if (!options.some((o) => o.value === field.value)) {
                  options.push({ value: field.value, label: `Personalizado ${parseColor(field.value).hex}` });
                }
                return (
                  <div className="flex gap-2">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            <span
                              className="inline-block h-4 w-4 rounded-full border"
                              style={{ backgroundColor: colorToCss(c.value) }}
                            />
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="color"
                      aria-label="Elegir color personalizado"
                      value={parseColor(field.value).hex.toLowerCase()}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className="h-9 w-12 cursor-pointer rounded-md border bg-transparent p-1"
                    />
                  </div>
                );
              }}
            />
            {isNewColor && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="save-color"
                  checked={saveNewColor}
                  onCheckedChange={(checked) => setSaveNewColor(checked === true)}
                />
                <Label htmlFor="save-color" className="font-normal">
                  Guardar este color en la paleta
                </Label>
              </div>
            )}
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
