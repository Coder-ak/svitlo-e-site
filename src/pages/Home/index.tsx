import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import LightTimer from '../../components/LightTimer/LightTimer';
import { Loading } from '../../components/Loading/Loading';
import NextState from '../../components/NextState/NextState';
import Status from '../../components/Status/Status';
import { State } from '../../state/svtilo-app-state';
import { Utils } from '../../utils/utils';
import './style.less';
import { useEffect } from 'react';

export function Home() {
  const fetchData = Utils.debounce_leading(async () => {
    State.value = { ...State.value, loading: true, error: null };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH);
      const data = await response.json();

      if (data?.timestamp != null) {
        State.value = { ...State.value, data, loading: false, error: null };
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      State.value = { ...State.value, loading: false, error: 'Виникла помилка. Спробуйте оновити сторінку.' };
    }
  });

  useEffect(() => {
    fetchData();

    const handleFocus = () => {
      fetchData();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const { data, loading, error } = State.value;

  return (
    <div class="home">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!error && data?.timestamp != null && (
        <>
          <section>
            <Status />
          </section>
          <section>
            <NextState />
          </section>
          <section>
            <LightTimer />
          </section>
        </>
      )}
    </div>
  );
}
