export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface UsersDatabase {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          created_at: string;
          email: string;
          status: string;
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
          status: string;
        };

        Delete: {
          id: number;
          created_at: string;
          email: string;
          name: string;
          password: string;
          status: string;
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
