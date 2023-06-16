import { useState, useEffect, useCallback } from 'react';
import { FIND, process } from '../Service/Api';

export const useFetchData = (path, queries = '', skip = 0, limit = 0) => {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ queries, skip, limit });

  const getData = useCallback(async () => {
    setLoading(true);
    const response = await process(FIND, path, {}, params);

    if (response?.status === 200) {
      setData(response.data);
    } else {
      console.log('Error', `No se pudo consultar hacia ${path}`);
    }

    setLoading(false);
  }, [process, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onChangeParams = (q = '', s = 0, l = 10) =>
  setParams({ queries: q, skip: s, limit: l });

  const update = () => getData();

  return [{ ...data, queries: params.queries }, loading, onChangeParams, update];
}