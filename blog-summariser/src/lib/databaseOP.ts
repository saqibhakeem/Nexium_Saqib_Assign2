import { supabase } from "./supabase-connection";

export async function storeMessageSupa(content: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ content }]);

  if (error) {
    console.error('Insert error:', error.message);
    return null;
  }

  return data;
}
