/**
 * Jawafdehi API (JDS) Types
 * 
 * Type definitions for the accountability and allegations API.
 * 
 * Reference: Jawafdehi_API-2.yaml
 * Base URL: https://mp55ce3b24df0bd1c9ea.free.beeceptor.com/api
 */

// ============================================================================
// Enums
// ============================================================================

export type AllegationType = 
  | 'corruption'
  | 'misconduct'
  | 'breach_of_trust'
  | 'broken_promise'
  | 'media_trial';

export type AllegationState = 
  | 'draft'
  | 'under_review'
  | 'current'
  | 'closed';

export type AllegationStatus = 
  | 'under_investigation'
  | 'closed'
  | null;

export type ModificationAction =
  | 'created'
  | 'submitted'
  | 'reviewed'
  | 'approved'
  | 'rejected'
  | 'updated'
  | 'response_added';

export type SourceType =
  | 'government'
  | 'ngo'
  | 'social_media'
  | 'media'
  | 'crowdsourced'
  | 'other';

// ============================================================================
// Main Types
// ============================================================================

export interface Timeline {
  id: number;
  date: string; // ISO date format
  title: string;
  description: string;
  order: number;
  allegation: number;
}

export interface Evidence {
  id: number;
  description: string;
  file_url?: string;
  source?: string;
  allegation: number;
  created_at?: string;
}

export interface Response {
  id: number;
  response_text: string;
  entity_id: string;
  submitted_at: string; // ISO datetime
  verified_at?: string | null; // ISO datetime
  allegation: number;
  verified_by?: number | null;
}

export interface Modification {
  id: number;
  action: ModificationAction;
  timestamp: string; // ISO datetime
  notes?: string;
  allegation: number;
  user?: number | null;
}

export interface DocumentSource {
  id: number;
  title: string;
  source_type: SourceType;
  url?: string;
  description?: string;
  published_date?: string;
  allegation?: number;
}

export interface Allegation {
  id: number;
  allegation_type: AllegationType;
  state: AllegationState;
  title: string;
  alleged_entities: any; // Can be structured based on NES entity IDs
  related_entities: any; // Can be structured based on NES entity IDs
  location_id?: string | null;
  description: string;
  key_allegations: string;
  status: AllegationStatus;
  created_at: string; // ISO datetime
  first_public_date?: string | null; // ISO datetime
  timelines: Timeline[];
  evidences: Evidence[];
  modifications: Modification[];
  responses: Response[];
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedAllegationList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Allegation[];
}

export interface PaginatedTimelineList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Timeline[];
}

export interface PaginatedEvidenceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Evidence[];
}

export interface PaginatedResponseList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Response[];
}

export interface PaginatedModificationList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Modification[];
}

export interface PaginatedDocumentSourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentSource[];
}

// ============================================================================
// Search/Filter Parameters
// ============================================================================

export interface AllegationSearchParams {
  allegation_type?: AllegationType;
  state?: AllegationState;
  status?: AllegationStatus;
  search?: string;
  ordering?: string;
  page?: number;
}

export interface EvidenceSearchParams {
  allegation?: number;
  page?: number;
}

export interface ResponseSearchParams {
  allegation?: number;
  page?: number;
}

export interface ModificationSearchParams {
  action?: ModificationAction;
  allegation?: number;
  page?: number;
}

export interface TimelineSearchParams {
  allegation?: number;
  page?: number;
}

export interface DocumentSourceSearchParams {
  source_type?: SourceType;
  search?: string;
  page?: number;
}
