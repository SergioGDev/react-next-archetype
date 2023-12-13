import { useLayoutEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { redirect } from 'next/navigation';

export const usePrivateRoute = () => {
  const { userData } = useAuthContext();
  useLayoutEffect(() => {
    if (!userData) {
        redirect('/login')
    }
  }, [userData])
}
