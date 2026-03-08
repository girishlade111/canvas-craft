export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assets: {
        Row: {
          created_at: string
          file_path: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          name: string
          project_id: string
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          name: string
          project_id: string
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          name?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          featured: boolean
          id: string
          project_id: string
          publish_date: string | null
          read_time: string
          slug: string
          status: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          project_id: string
          publish_date?: string | null
          read_time?: string
          slug?: string
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          project_id?: string
          publish_date?: string | null
          read_time?: string
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_collections: {
        Row: {
          created_at: string
          fields: Json
          id: string
          item_count: number
          name: string
          project_id: string
          slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          fields?: Json
          id?: string
          item_count?: number
          name: string
          project_id: string
          slug?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          fields?: Json
          id?: string
          item_count?: number
          name?: string
          project_id?: string
          slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_collections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      components: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_global: boolean
          name: string
          project_id: string | null
          schema: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_global?: boolean
          name: string
          project_id?: string | null
          schema?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_global?: boolean
          name?: string
          project_id?: string | null
          schema?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "components_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          id: string
          project_id: string
          type: string
          usage_count: number
          user_id: string
          value: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          id?: string
          project_id: string
          type?: string
          usage_count?: number
          user_id: string
          value?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          id?: string
          project_id?: string
          type?: string
          usage_count?: number
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "coupons_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      deployments: {
        Row: {
          build_log: string | null
          created_at: string
          deployment_url: string | null
          id: string
          project_id: string
          provider: string
          status: string
          updated_at: string
          user_id: string
          version_number: number
        }
        Insert: {
          build_log?: string | null
          created_at?: string
          deployment_url?: string | null
          id?: string
          project_id: string
          provider?: string
          status?: string
          updated_at?: string
          user_id: string
          version_number?: number
        }
        Update: {
          build_log?: string | null
          created_at?: string
          deployment_url?: string | null
          id?: string
          project_id?: string
          provider?: string
          status?: string
          updated_at?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "deployments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          click_rate: number | null
          created_at: string
          id: string
          name: string
          open_rate: number | null
          project_id: string
          recipients: number
          scheduled_date: string | null
          sent_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          click_rate?: number | null
          created_at?: string
          id?: string
          name: string
          open_rate?: number | null
          project_id: string
          recipients?: number
          scheduled_date?: string | null
          sent_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          click_rate?: number | null
          created_at?: string
          id?: string
          name?: string
          open_rate?: number | null
          project_id?: string
          recipients?: number
          scheduled_date?: string | null
          sent_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number
          created_at: string
          date: string
          id: string
          location: string
          name: string
          price: number
          project_id: string
          registered: number
          time: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          date?: string
          id?: string
          location?: string
          name: string
          price?: number
          project_id: string
          registered?: number
          time?: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          capacity?: number
          created_at?: string
          date?: string
          id?: string
          location?: string
          name?: string
          price?: number
          project_id?: string
          registered?: number
          time?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      installed_apps: {
        Row: {
          app_key: string
          id: string
          installed_at: string
          project_id: string
          user_id: string
        }
        Insert: {
          app_key: string
          id?: string
          installed_at?: string
          project_id: string
          user_id: string
        }
        Update: {
          app_key?: string
          id?: string
          installed_at?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installed_apps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      interactive_elements: {
        Row: {
          animation_type: string
          author_id: string | null
          category: string
          compatible_sections: string[]
          created_at: string
          description: string
          element_schema: Json
          id: string
          installs: number
          is_premium: boolean
          is_public: boolean
          name: string
          preview_css: string | null
          subcategory: string
          tags: string[]
          thumbnail: string
          updated_at: string
        }
        Insert: {
          animation_type?: string
          author_id?: string | null
          category?: string
          compatible_sections?: string[]
          created_at?: string
          description?: string
          element_schema?: Json
          id?: string
          installs?: number
          is_premium?: boolean
          is_public?: boolean
          name: string
          preview_css?: string | null
          subcategory?: string
          tags?: string[]
          thumbnail?: string
          updated_at?: string
        }
        Update: {
          animation_type?: string
          author_id?: string | null
          category?: string
          compatible_sections?: string[]
          created_at?: string
          description?: string
          element_schema?: Json
          id?: string
          installs?: number
          is_premium?: boolean
          is_public?: boolean
          name?: string
          preview_css?: string | null
          subcategory?: string
          tags?: string[]
          thumbnail?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer: string
          id: string
          items: number
          project_id: string
          status: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          customer: string
          id?: string
          items?: number
          project_id: string
          status?: string
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          customer?: string
          id?: string
          items?: number
          project_id?: string
          status?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      page_versions: {
        Row: {
          created_at: string
          id: string
          page_id: string
          schema: Json
          version_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          page_id: string
          schema?: Json
          version_number?: number
        }
        Update: {
          created_at?: string
          id?: string
          page_id?: string
          schema?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "page_versions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          id: string
          name: string
          project_id: string
          schema: Json
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          project_id: string
          schema?: Json
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          project_id?: string
          schema?: Json
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          compare_price: number | null
          created_at: string
          id: string
          image: string
          inventory: number
          name: string
          price: number
          project_id: string
          sales: number
          status: string
          updated_at: string
          user_id: string
          variants: number
        }
        Insert: {
          category?: string
          compare_price?: number | null
          created_at?: string
          id?: string
          image?: string
          inventory?: number
          name: string
          price?: number
          project_id: string
          sales?: number
          status?: string
          updated_at?: string
          user_id: string
          variants?: number
        }
        Update: {
          category?: string
          compare_price?: number | null
          created_at?: string
          id?: string
          image?: string
          inventory?: number
          name?: string
          price?: number
          project_id?: string
          sales?: number
          status?: string
          updated_at?: string
          user_id?: string
          variants?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_settings: {
        Row: {
          analytics_scripts: string | null
          created_at: string
          custom_domain: string | null
          custom_head_code: string | null
          favicon_url: string | null
          id: string
          meta_description: string | null
          og_image_url: string | null
          project_id: string
          site_title: string | null
          updated_at: string
        }
        Insert: {
          analytics_scripts?: string | null
          created_at?: string
          custom_domain?: string | null
          custom_head_code?: string | null
          favicon_url?: string | null
          id?: string
          meta_description?: string | null
          og_image_url?: string | null
          project_id: string
          site_title?: string | null
          updated_at?: string
        }
        Update: {
          analytics_scripts?: string | null
          created_at?: string
          custom_domain?: string | null
          custom_head_code?: string | null
          favicon_url?: string | null
          id?: string
          meta_description?: string | null
          og_image_url?: string | null
          project_id?: string
          site_title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_settings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          bookings: number
          category: string
          created_at: string
          duration: string
          id: string
          name: string
          price: number
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bookings?: number
          category?: string
          created_at?: string
          duration?: string
          id?: string
          name: string
          price?: number
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bookings?: number
          category?: string
          created_at?: string
          duration?: string
          id?: string
          name?: string
          price?: number
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          platform: string
          project_id: string
          scheduled_date: string | null
          status: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          platform?: string
          project_id: string
          scheduled_date?: string | null
          status?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          platform?: string
          project_id?: string
          scheduled_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          author_id: string | null
          category: string
          created_at: string
          description: string
          id: string
          installs: number
          is_premium: boolean
          is_public: boolean
          name: string
          preview_image_url: string | null
          schema: Json
          tags: string[]
          thumbnail: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          installs?: number
          is_premium?: boolean
          is_public?: boolean
          name: string
          preview_image_url?: string | null
          schema?: Json
          tags?: string[]
          thumbnail?: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          installs?: number
          is_premium?: boolean
          is_public?: boolean
          name?: string
          preview_image_url?: string | null
          schema?: Json
          tags?: string[]
          thumbnail?: string
          updated_at?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
