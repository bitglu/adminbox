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
          email: string;
          name: string;
          password: string;
        };
        Insert: {
          email: string;
          name: string;
          password: string;
        };
        Update: {
          id: number;
          created_at: string;
          email: string;
          name: string;
          password: string;
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
