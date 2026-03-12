export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: string;
          created_at: string;
          updated_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: string;
          created_at?: string;
          updated_at?: string;
          created_by: string;
        };
        Update: {
          name?: string;
          slug?: string;
          plan?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          description: string | null;
          genre: string | null;
          target_word_count: number | null;
          status: string;
          created_at: string;
          updated_at: string;
          created_by: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          org_id: string;
          title: string;
          description?: string | null;
          genre?: string | null;
          target_word_count?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
          created_by: string;
          deleted_at?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          genre?: string | null;
          target_word_count?: number | null;
          status?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
    };
  };
}
