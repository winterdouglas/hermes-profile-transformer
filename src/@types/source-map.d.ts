import 'source-map';

// Extending the type to unhide the initialize function, that's necessary to be called from web
declare module 'source-map' {
  interface SourceMapConsumerConstructor {
    initialize(options: Record<string, string>): void;
  }
}
