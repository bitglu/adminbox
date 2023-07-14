export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface LogsDatabase {
  public: {
    Tables: {
      logs: {
        Row: {
          id: number;
          created_at: string;
          actions: string;
          user_id: string;
        };
        Insert: {
          user_id: string;
          action: string;
        };
        Update: {
          id: number;
          created_at: string;
          actions: string;
          user_id: string;
        };
        Delete: {
          id: number;
          created_at: string;
          actions: string;
          user_id: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
