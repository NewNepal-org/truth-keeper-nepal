/**
 * useEntityDetail Hook
 * 
 * Fetch comprehensive entity details including:
 * - Profile data
 * - Relationships
 * - Version history
 * - Allegations
 * - Cases
 * - Sources (evidence + attributions)
 */

import { useState, useEffect } from 'react';
import { 
  getEntityById,
  getEntityAllegations,
  getEntityCases,
  type Allegation as PAPAllegation,
  type Case as PAPCase,
} from '@/services/api';
import { getCaseById } from '@/services/jds-api';
import type { Entity } from '@/types/nes';
import type { Case as JDSCase } from '@/types/jds';

interface UseEntityDetailOptions {
  entityId?: string;
  entityType?: string;
  entitySlug?: string;
  allegedCaseIds?: number[];
  relatedCaseIds?: number[];
  autoFetch?: boolean;
}

interface UseEntityDetailReturn {
  entity: Entity | null;
  allegations: PAPAllegation[];
  allegedCases: JDSCase[];
  relatedCases: JDSCase[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useEntityDetail(options: UseEntityDetailOptions = {}): UseEntityDetailReturn {
  const { entityId, entityType, entitySlug, allegedCaseIds = [], relatedCaseIds = [], autoFetch = true } = options;

  const [entity, setEntity] = useState<Entity | null>(null);
  const [allegations, setAllegations] = useState<PAPAllegation[]>([]);
  const [allegedCases, setAllegedCases] = useState<JDSCase[]>([]);
  const [relatedCases, setRelatedCases] = useState<JDSCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEntityDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch entity profile (if entityId is provided)
      let entityData: Entity | null = null;
      if (entityType && entitySlug) {
        // Construct NES entity ID format: entity:type/slug
        const nesEntityId = `entity:${entityType}/${entitySlug}`;
        entityData = await getEntityById(nesEntityId);
      } else if (entityId) {
        entityData = await getEntityById(entityId);
      }
      
      if (entityData) {
        setEntity(entityData);
      }

      // 2. Fetch cases by IDs from the provided arrays
      const allegedCasesPromises = allegedCaseIds.map(id => getCaseById(id).catch(() => null));
      const relatedCasesPromises = relatedCaseIds.map(id => getCaseById(id).catch(() => null));

      const [allegedCasesData, relatedCasesData] = await Promise.all([
        Promise.all(allegedCasesPromises),
        Promise.all(relatedCasesPromises),
      ]);

      // Filter out null values (failed fetches)
      const validAllegedCases = allegedCasesData.filter((c): c is JDSCase => c !== null);
      const validRelatedCases = relatedCasesData.filter((c): c is JDSCase => c !== null);

      // 3. Set all data
      setAllegations([]);
      setAllegedCases(validAllegedCases);
      setRelatedCases(validRelatedCases);

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch entity details');
      setError(error);
      setEntity(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchEntityDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId, entityType, entitySlug, autoFetch]);

  return {
    entity,
    allegations,
    allegedCases,
    relatedCases,
    loading,
    error,
    refetch: fetchEntityDetail,
  };
}
