
import { supabase } from "../integrations/supabase/client";

export const setupDatabase = async () => {
  // Create function to add column if missing
  const { error: functionError } = await supabase.rpc('create_add_phone_column_function');
  
  if (functionError && !functionError.message.includes('already exists')) {
    // Create the function directly using SQL
    const { error: sqlError } = await supabase.from('bikes').select('count(*)').limit(1);
    
    if (!sqlError) {
      // Check if column exists
      const { data: columnExists } = await supabase
        .from('_metadata')
        .select('*')
        .eq('table', 'bikes')
        .eq('column', 'phone');
      
      if (!columnExists || columnExists.length === 0) {
        // Add phone column
        const { error: alterError } = await supabase.rpc('add_phone_column');
        
        if (alterError && !alterError.message.includes('already exists')) {
          console.error('Failed to add phone column:', alterError);
        }
      }
    }
  }
};
