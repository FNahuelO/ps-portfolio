import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSession } from "./useSession";

export function LoginPage() {
  const session = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("No se pudo iniciar sesión. Revisá email y contraseña.");
      return;
    }
    navigate("/admin", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C0E0FF]/30 via-white to-[#FFB2F7]/20 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-[30px] shadow-xl border border-[#C0E0FF]/40 p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <img src="/favicon.svg" alt="" className="h-12 w-12 rounded-2xl shadow-lg mx-auto" aria-hidden />
          <h1 className="text-2xl">Panel admin</h1>
          <p className="text-sm text-gray-500">Ingresá para gestionar tus trabajos</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#AB9DFF] hover:bg-[#253AB2] text-white rounded-full shadow-lg"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </div>
  );
}
