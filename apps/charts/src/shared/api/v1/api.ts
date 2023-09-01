import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_V1_URL } from '@/shared/config';

const getImport = async (id: string) => {
  const { data } = await axios.get(`${API_V1_URL}/imports/${id}`);
  return data;
};

export function useImport(id: string) {
  return useQuery({
    queryKey: ['import', id],
    queryFn: () => getImport(id),
  });
}
