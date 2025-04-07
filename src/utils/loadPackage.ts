import type { SourceMapConsumerConstructor } from 'source-map';

const isBrowser = typeof window !== 'undefined';

const SOURCE_MAP_VERSION = '0.7.3';
const SOURCE_MAP_PACKAGE_URL = `https://unpkg.com/source-map@${SOURCE_MAP_VERSION}`;
const SOURCE_MAP_WASM_URL = `${SOURCE_MAP_PACKAGE_URL}/lib/mappings.wasm`;

export const loadPackage = async (): Promise<{
  SourceMapConsumer: SourceMapConsumerConstructor;
}> => {
  if (!isBrowser) {
    const packageInstance = await import('source-map');
    return packageInstance;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${SOURCE_MAP_PACKAGE_URL}/dist/source-map.js`;
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const srcMap = (window as any).sourceMap;

      srcMap?.SourceMapConsumer.initialize({
        'lib/mappings.wasm': SOURCE_MAP_WASM_URL,
      });

      resolve(srcMap);
    };
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};
