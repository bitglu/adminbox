export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface TransactionsDatabase {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: number;
          created_at: string;
          provider_id: string;
          type: string;
          amount: string;
          status: string;
        };
        Insert: {
          provider_id: string;
          type: string;
          amount: string;
          status: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          provider_id?: string;
          type?: string;
          amount?: string;
          status?: string;
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
