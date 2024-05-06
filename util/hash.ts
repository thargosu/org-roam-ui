
import { useCallback } from 'react';
import { useRouter } from 'next/router'

export const useHash = () => {
  const router = useRouter()

  const setHash = useCallback((newHash?: string) => {
    if (!newHash) return;
    router.replace({ hash: newHash }, undefined, { shallow: true })
  }, [router])

  return { setHash }
};