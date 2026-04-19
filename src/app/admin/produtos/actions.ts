"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

function parseLinesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseLinesToSpecs(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) out[key.trim()] = rest.join(":").trim();
  }
  return out;
}

async function uploadImage(file: File, slug: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const admin = createAdminClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${slug}-${Date.now()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await admin.storage
    .from("produtos")
    .upload(path, new Uint8Array(arrayBuffer), {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });
  if (error) throw new Error(`Upload falhou: ${error.message}`);
  const { data } = admin.storage.from("produtos").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveProduto(id: string | null, formData: FormData) {
  await requireAuth();

  const nome = String(formData.get("nome") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() || slugify(nome);
  const marca_slug = String(formData.get("marca_slug") ?? "") || null;
  const categoria_slug = String(formData.get("categoria_slug") ?? "") || null;
  const descricao_curta = String(formData.get("descricao_curta") ?? "") || null;
  const descricao = String(formData.get("descricao") ?? "") || null;
  const precoRaw = String(formData.get("preco") ?? "").replace(",", ".");
  const preco = precoRaw ? Number(precoRaw) : null;
  const condicao = (String(formData.get("condicao") ?? "novo") === "seminovo"
    ? "seminovo"
    : "novo") as "novo" | "seminovo";
  const recursos = parseLinesToArray(String(formData.get("recursos") ?? ""));
  const especificacoes = parseLinesToSpecs(
    String(formData.get("especificacoes") ?? ""),
  );
  const estoque = Number(formData.get("estoque") ?? 0) || 0;
  const ativo = formData.get("ativo") === "on";
  const destaque = formData.get("destaque") === "on";

  const imagemFile = formData.get("imagem") as File | null;
  const imagemExistente = String(formData.get("imagem_existente") ?? "") || null;
  let imagem_url: string | null = imagemExistente;
  if (imagemFile && imagemFile.size > 0) {
    imagem_url = await uploadImage(imagemFile, slug);
  }

  const admin = createAdminClient();
  const payload = {
    slug,
    nome,
    marca_slug,
    categoria_slug,
    descricao_curta,
    descricao,
    preco,
    condicao,
    recursos,
    especificacoes,
    estoque,
    imagem_url,
    ativo,
    destaque,
  };

  if (id) {
    const { error } = await admin.from("produtos").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("produtos").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath(`/produtos/${slug}`);
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function deleteProduto(id: string) {
  await requireAuth();
  const admin = createAdminClient();
  const { error } = await admin.from("produtos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function toggleAtivo(id: string, ativo: boolean) {
  await requireAuth();
  const admin = createAdminClient();
  const { error } = await admin
    .from("produtos")
    .update({ ativo })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}
