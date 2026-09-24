import { supabase } from "@/supabaseClient";

export async function uploadFotoMedicao(medicaoId: string, file: File) {
    try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${medicaoId}/${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("fotos_medicoes")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
        });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
            .from("fotos_medicoes")
            .getPublicUrl(filePath);
        const publicUrl = urlData.publicUrl;

        const { data: dbData, error: dbError } = await supabase
            .from("medicao_fotos")
            .insert({
                medicao_id: medicaoId,
                url_foto: publicUrl,
                nome_arquivo: file.name,
            })
            .select()
            .single();
        if (dbError) throw dbError;
        return dbData;
    } catch (error: any) {
        console.error("Erro ao fazer upload da foto:", error.message);
        throw error;
    }
}