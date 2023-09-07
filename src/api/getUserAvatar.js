import { useCallback, useState } from 'react';
import { APIService } from '../axios/client';

export function GetUserAvatar() {
  const [userAvatar, setUserAvatar] = useState('');

  const getUserAvatar = useCallback(
    async (userId, accessToken) => {
      try {
        const response = await APIService.get(`/user/avatar/${userId}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const blob = response.data;
          setUserAvatar(URL.createObjectURL(blob));
        } else {
          console.error('Failed to get user avatar:', response.statusText);
        }
      } catch (error) {
        console.error('Error getting user avatar:', error);
      }
    },
    [] // You may include additional dependencies if needed
  );

  return { userAvatar, getUserAvatar };
}
