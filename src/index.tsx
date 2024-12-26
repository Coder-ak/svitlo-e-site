import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import PullToRefresh from 'pulltorefreshjs';

import { Header } from './components/Header/Header.js';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.less';
import { Footer } from './components/Footer/Footer.js';

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
      <Footer />
    </LocationProvider>
  );
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'));
}

function pullToRefresh(): void {
  PullToRefresh.init({
    mainElement: 'body',
    distMax: 114,
    distThreshold: 80,
    distReload: 94,
    instructionsPullToRefresh: 'Потягніть вниз, щоб оновити',
    instructionsReleaseToRefresh: 'Відпустіть, щоб оновити',
    instructionsRefreshing: 'Оновлюється',
    onRefresh() {
      window.location.reload();
    },
  });
}

if (typeof window !== 'undefined') {
  pullToRefresh();
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
