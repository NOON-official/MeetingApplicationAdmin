import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useInterval from '@/hooks/useInterval';
import { refreshJwtToken } from '@/features/user/asyncActions';
import { STORAGE_KEY_ACCESS_TOKEN } from '@/config/constants';
import { AppDispatch } from '@/store';
import browserStorage from '@/utils/browserStorage';
import dynamic from 'next/dynamic';

function StaticJwtProvider() {
  const dispatch = useDispatch<AppDispatch>();

  const checkTokenAndRefresh = useCallback(() => {
    const storageAccessToken = browserStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);

    if (!storageAccessToken) {
      return;
    }

    dispatch(refreshJwtToken());
  }, [dispatch]);

  // JWT 토큰 초기 Refresh
  useEffect(() => {
    checkTokenAndRefresh();
  }, [checkTokenAndRefresh]);

  // JWT 토큰 주기적 Refresh 시도 (10분 간격)
  useInterval(checkTokenAndRefresh, 10 * 60 * 1000);

  return null;
}

const JwtProvider = dynamic(() => Promise.resolve(StaticJwtProvider), {
  ssr: false,
});

export default JwtProvider;
