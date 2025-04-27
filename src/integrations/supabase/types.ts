export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
<<<<<<< HEAD
  | Json[]
=======
  | Json[];
>>>>>>> tempRepo/main

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
<<<<<<< HEAD
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string | null
          description: string
          id: string
          invoice_id: string | null
          quantity: number
          service_id: string | null
          unit_price: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          description: string
          id?: string
          invoice_id?: string | null
          quantity: number
          service_id?: string | null
          unit_price: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string | null
          created_at: string | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          status: string | null
          terms: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          invoice_date: string
          invoice_number: string
          notes?: string | null
          status?: string | null
          terms?: string | null
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          status?: string | null
          terms?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_address: string | null
          business_name: string | null
          city: string | null
          created_at: string | null
          gst_number: string | null
          id: string
          phone: string | null
          pincode: string | null
          state: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_address?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string | null
          gst_number?: string | null
          id: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_address?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string | null
          gst_number?: string | null
          id?: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]
=======
          address: string | null;
          created_at: string | null;
          email: string | null;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          name: string;
          phone?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          address?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      invoice_items: {
        Row: {
          amount: number;
          created_at: string | null;
          description: string;
          id: string;
          invoice_id: string | null;
          quantity: number;
          service_id: string | null;
          unit_price: number;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          description: string;
          id?: string;
          invoice_id?: string | null;
          quantity: number;
          service_id?: string | null;
          unit_price: number;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          description?: string;
          id?: string;
          invoice_id?: string | null;
          quantity?: number;
          service_id?: string | null;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_items_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices: {
        Row: {
          client_id: string | null;
          created_at: string | null;
          due_date: string;
          id: string;
          invoice_date: string;
          invoice_number: string;
          notes: string | null;
          status: string | null;
          terms: string | null;
          total_amount: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          client_id?: string | null;
          created_at?: string | null;
          due_date: string;
          id?: string;
          invoice_date: string;
          invoice_number: string;
          notes?: string | null;
          status?: string | null;
          terms?: string | null;
          total_amount: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          client_id?: string | null;
          created_at?: string | null;
          due_date?: string;
          id?: string;
          invoice_date?: string;
          invoice_number?: string;
          notes?: string | null;
          status?: string | null;
          terms?: string | null;
          total_amount?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          business_address: string | null;
          business_name: string | null;
          city: string | null;
          created_at: string | null;
          gst_number: string | null;
          id: string;
          phone: string | null;
          pincode: string | null;
          state: string | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          business_address?: string | null;
          business_name?: string | null;
          city?: string | null;
          created_at?: string | null;
          gst_number?: string | null;
          id: string;
          phone?: string | null;
          pincode?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          business_address?: string | null;
          business_name?: string | null;
          city?: string | null;
          created_at?: string | null;
          gst_number?: string | null;
          id?: string;
          phone?: string | null;
          pincode?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      services: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          price: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          price: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          price?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
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
};

type DefaultSchema = Database[Extract<keyof Database, "public">];
>>>>>>> tempRepo/main

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof Database
=======
    schema: keyof Database;
>>>>>>> tempRepo/main
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
<<<<<<< HEAD
      Row: infer R
=======
      Row: infer R;
>>>>>>> tempRepo/main
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
<<<<<<< HEAD
        Row: infer R
      }
      ? R
      : never
    : never
=======
        Row: infer R;
      }
      ? R
      : never
    : never;
>>>>>>> tempRepo/main

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof Database
=======
    schema: keyof Database;
>>>>>>> tempRepo/main
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
<<<<<<< HEAD
      Insert: infer I
=======
      Insert: infer I;
>>>>>>> tempRepo/main
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
<<<<<<< HEAD
        Insert: infer I
      }
      ? I
      : never
    : never
=======
        Insert: infer I;
      }
      ? I
      : never
    : never;
>>>>>>> tempRepo/main

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof Database
=======
    schema: keyof Database;
>>>>>>> tempRepo/main
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
<<<<<<< HEAD
      Update: infer U
=======
      Update: infer U;
>>>>>>> tempRepo/main
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
<<<<<<< HEAD
        Update: infer U
      }
      ? U
      : never
    : never
=======
        Update: infer U;
      }
      ? U
      : never
    : never;
>>>>>>> tempRepo/main

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof Database
=======
    schema: keyof Database;
>>>>>>> tempRepo/main
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
<<<<<<< HEAD
    : never
=======
    : never;
>>>>>>> tempRepo/main

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof Database
=======
    schema: keyof Database;
>>>>>>> tempRepo/main
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
<<<<<<< HEAD
    : never
=======
    : never;
>>>>>>> tempRepo/main

export const Constants = {
  public: {
    Enums: {},
  },
<<<<<<< HEAD
} as const
=======
} as const;
>>>>>>> tempRepo/main
