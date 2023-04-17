export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];
export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      migrations: {
        Row: {
          id: number;
          name: string;
          timestamp: number;
        };
        Insert: {
          id?: number;
          name: string;
          timestamp: number;
        };
        Update: {
          id?: number;
          name?: string;
          timestamp?: number;
        };
      };
      project: {
        Row: {
          createdAt: string;
          description: string | null;
          id: number;
          logo: string | null;
          name: string;
          ownerId: string;
          ratingSum: number;
          reviewCount: number;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          description?: string | null;
          id?: number;
          logo?: string | null;
          name: string;
          ownerId: string;
          ratingSum?: number;
          reviewCount?: number;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          description?: string | null;
          id?: number;
          logo?: string | null;
          name?: string;
          ownerId?: string;
          ratingSum?: number;
          reviewCount?: number;
          updatedAt?: string;
        };
      };
      review: {
        Row: {
          createdAt: string;
          datahash: string;
          id: number;
          projectId: number;
          rating: number;
          signature: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          datahash: string;
          id?: number;
          projectId: number;
          rating?: number;
          signature: string;
          updatedAt?: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          datahash?: string;
          id?: number;
          projectId?: number;
          rating?: number;
          signature?: string;
          updatedAt?: string;
          userId?: string;
        };
      };
      user: {
        Row: {
          accountType: Database['public']['Enums']['user_accounttype_enum'];
          address: string;
          createdAt: string;
          id: string;
          picture: string | null;
          points: number;
          updatedAt: string;
        };
        Insert: {
          accountType: Database['public']['Enums']['user_accounttype_enum'];
          address: string;
          createdAt?: string;
          id?: string;
          picture?: string | null;
          points?: number;
          updatedAt?: string;
        };
        Update: {
          accountType?: Database['public']['Enums']['user_accounttype_enum'];
          address?: string;
          createdAt?: string;
          id?: string;
          picture?: string | null;
          points?: number;
          updatedAt?: string;
        };
      };
      user_verification: {
        Row: {
          accountType: Database['public']['Enums']['user_verification_accounttype_enum'];
          address: string;
          createdAt: string;
          datahash: string;
          description: string | null;
          id: number;
          name: string;
          picture: string | null;
          signature: string;
          twitter: string;
          updatedAt: string;
          userId: string | null;
        };
        Insert: {
          accountType: Database['public']['Enums']['user_verification_accounttype_enum'];
          address: string;
          createdAt?: string;
          datahash: string;
          description?: string | null;
          id?: number;
          name: string;
          picture?: string | null;
          signature: string;
          twitter: string;
          updatedAt?: string;
          userId?: string | null;
        };
        Update: {
          accountType?: Database['public']['Enums']['user_verification_accounttype_enum'];
          address?: string;
          createdAt?: string;
          datahash?: string;
          description?: string | null;
          id?: number;
          name?: string;
          picture?: string | null;
          signature?: string;
          twitter?: string;
          updatedAt?: string;
          userId?: string | null;
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
      user_accounttype_enum: 'project' | 'user';
      user_verification_accounttype_enum: 'project' | 'user';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
