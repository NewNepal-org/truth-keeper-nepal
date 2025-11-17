/**
 * Jawafdehi API (JDS) Client
 * 
 * API client for the accountability and allegations service.
 * 
 * Reference: Jawafdehi_API-2.yaml
 * Environment Variable: VITE_JDS_API_BASE_URL (default: https://api.jawafdehi.newnepal.org/api)
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Allegation,
  PaginatedAllegationList,
  AllegationSearchParams,
  Evidence,
  PaginatedEvidenceList,
  EvidenceSearchParams,
  Response as JDSResponse,
  PaginatedResponseList,
  ResponseSearchParams,
  Modification,
  PaginatedModificationList,
  ModificationSearchParams,
  Timeline,
  PaginatedTimelineList,
  TimelineSearchParams,
  DocumentSource,
  PaginatedDocumentSourceList,
  DocumentSourceSearchParams,
} from '@/types/jds';

// ============================================================================
// API Configuration
// ============================================================================

const JDS_API_BASE_URL = import.meta.env.VITE_JDS_API_BASE_URL || 'https://api.jawafdehi.newnepal.org/api';

const jdsApi: AxiosInstance = axios.create({
  baseURL: JDS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ============================================================================
// Error Handling
// ============================================================================

export class JDSApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'JDSApiError';
  }
}

function handleApiError(error: unknown, functionName: string, endpoint: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;
    const responseData = axiosError.response?.data as any;
    const message = responseData?.detail || axiosError.message;

    throw new JDSApiError(
      `${functionName} failed: ${message}`,
      statusCode,
      endpoint,
      axiosError
    );
  }

  throw new JDSApiError(
    `${functionName} failed: Unknown error`,
    undefined,
    endpoint,
    error instanceof Error ? error : undefined
  );
}

// ============================================================================
// Allegation API Functions
// ============================================================================

/**
 * Get list of allegations with optional filters
 * 
 * @param params - Search and filter parameters
 * @returns Promise<PaginatedAllegationList>
 * 
 * @example
 * ```typescript
 * const allegations = await getAllegations({
 *   allegation_type: 'corruption',
 *   state: 'current',
 *   page: 1
 * });
 * ```
 */
export async function getAllegations(params?: AllegationSearchParams): Promise<PaginatedAllegationList> {
  try {
    const response = await jdsApi.get<PaginatedAllegationList>('/allegations/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getAllegations', '/allegations/');
  }
}

/**
 * Get a single allegation by ID
 * 
 * @param id - Allegation ID
 * @returns Promise<Allegation>
 * 
 * @example
 * ```typescript
 * const allegation = await getAllegationById(123);
 * ```
 */
export async function getAllegationById(id: number): Promise<Allegation> {
  try {
    const response = await jdsApi.get<Allegation>(`/allegations/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getAllegationById', `/allegations/${id}/`);
  }
}

/**
 * Get allegations for a specific entity (by entity ID)
 * 
 * @param entityId - NES Entity ID
 * @param params - Additional search parameters
 * @returns Promise<Allegation[]>
 * 
 * @example
 * ```typescript
 * const entityAllegations = await getAllegationsByEntity('entity:person/prabin-shahi');
 * ```
 */
export async function getAllegationsByEntity(
  entityId: string,
  params?: AllegationSearchParams
): Promise<Allegation[]> {
  try {
    const response = await getAllegations(params);
    
    // Filter allegations where the entity is in alleged_entities or related_entities
    return response.results.filter(allegation => {
      const allegedIds = Array.isArray(allegation.alleged_entities) 
        ? allegation.alleged_entities 
        : Object.values(allegation.alleged_entities || {});
      const relatedIds = Array.isArray(allegation.related_entities)
        ? allegation.related_entities
        : Object.values(allegation.related_entities || {});
      
      return allegedIds.includes(entityId) || relatedIds.includes(entityId);
    });
  } catch (error) {
    console.error(`Failed to get allegations for entity ${entityId}:`, error);
    return [];
  }
}

// ============================================================================
// Evidence API Functions
// ============================================================================

/**
 * Get evidence with optional filters
 * 
 * @param params - Search parameters
 * @returns Promise<PaginatedEvidenceList>
 */
export async function getEvidence(params?: EvidenceSearchParams): Promise<PaginatedEvidenceList> {
  try {
    const response = await jdsApi.get<PaginatedEvidenceList>('/evidence/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getEvidence', '/evidence/');
  }
}

/**
 * Get a single evidence item by ID
 * 
 * @param id - Evidence ID
 * @returns Promise<Evidence>
 */
export async function getEvidenceById(id: number): Promise<Evidence> {
  try {
    const response = await jdsApi.get<Evidence>(`/evidence/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getEvidenceById', `/evidence/${id}/`);
  }
}

// ============================================================================
// Response API Functions
// ============================================================================

/**
 * Get responses with optional filters
 * 
 * @param params - Search parameters
 * @returns Promise<PaginatedResponseList>
 */
export async function getResponses(params?: ResponseSearchParams): Promise<PaginatedResponseList> {
  try {
    const response = await jdsApi.get<PaginatedResponseList>('/responses/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getResponses', '/responses/');
  }
}

/**
 * Get a single response by ID
 * 
 * @param id - Response ID
 * @returns Promise<JDSResponse>
 */
export async function getResponseById(id: number): Promise<JDSResponse> {
  try {
    const response = await jdsApi.get<JDSResponse>(`/responses/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getResponseById', `/responses/${id}/`);
  }
}

// ============================================================================
// Timeline API Functions
// ============================================================================

/**
 * Get timeline entries with optional filters
 * 
 * @param params - Search parameters
 * @returns Promise<PaginatedTimelineList>
 */
export async function getTimelines(params?: TimelineSearchParams): Promise<PaginatedTimelineList> {
  try {
    const response = await jdsApi.get<PaginatedTimelineList>('/timelines/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getTimelines', '/timelines/');
  }
}

/**
 * Get a single timeline entry by ID
 * 
 * @param id - Timeline ID
 * @returns Promise<Timeline>
 */
export async function getTimelineById(id: number): Promise<Timeline> {
  try {
    const response = await jdsApi.get<Timeline>(`/timelines/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getTimelineById', `/timelines/${id}/`);
  }
}

// ============================================================================
// Modification API Functions
// ============================================================================

/**
 * Get modifications with optional filters
 * 
 * @param params - Search parameters
 * @returns Promise<PaginatedModificationList>
 */
export async function getModifications(params?: ModificationSearchParams): Promise<PaginatedModificationList> {
  try {
    const response = await jdsApi.get<PaginatedModificationList>('/modifications/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getModifications', '/modifications/');
  }
}

/**
 * Get a single modification by ID
 * 
 * @param id - Modification ID
 * @returns Promise<Modification>
 */
export async function getModificationById(id: number): Promise<Modification> {
  try {
    const response = await jdsApi.get<Modification>(`/modifications/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getModificationById', `/modifications/${id}/`);
  }
}

// ============================================================================
// Document Source API Functions
// ============================================================================

/**
 * Get document sources with optional filters
 * 
 * @param params - Search parameters
 * @returns Promise<PaginatedDocumentSourceList>
 */
export async function getDocumentSources(params?: DocumentSourceSearchParams): Promise<PaginatedDocumentSourceList> {
  try {
    const response = await jdsApi.get<PaginatedDocumentSourceList>('/sources/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getDocumentSources', '/sources/');
  }
}

/**
 * Get a single document source by ID
 * 
 * @param id - Document Source ID
 * @returns Promise<DocumentSource>
 */
export async function getDocumentSourceById(id: number): Promise<DocumentSource> {
  try {
    const response = await jdsApi.get<DocumentSource>(`/sources/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'getDocumentSourceById', `/sources/${id}/`);
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get cases (allegations) for a specific entity
 * Note: In JDS, cases are represented as allegations
 * 
 * @param entityId - NES Entity ID
 * @returns Promise<Allegation[]>
 */
export async function getCasesByEntity(entityId: string): Promise<Allegation[]> {
  // Cases are essentially allegations in this system
  return getAllegationsByEntity(entityId, { state: 'current' });
}
