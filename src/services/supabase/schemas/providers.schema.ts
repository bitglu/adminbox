export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface ProvidersDatabase {
  public: {
    Tables: {
      providers: {
        Row: {
          id: number;
          created_at: string;
          description: string;
          name: string;
          type: string;
        };
        Insert: {
          description: string;
          name: string;
          type: string;
        };
        Update: {
          id: number;
          created_at: string;
          description: string;
          name: string;
          type: string;
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
