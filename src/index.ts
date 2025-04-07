import { CpuProfilerModel } from './profiler/cpuProfilerModel';
import { DurationEvent } from './types/EventInterfaces';
import { HermesCPUProfile } from './types/HermesProfile';
import applySourceMapsToEvents from './profiler/applySourceMapsToEvents';
import { SourceMap } from './types/SourceMap';

/**
 * This transformer can take in the cpu profile, the source map (optional) and the bundle file name (optional)
 * and return a promise which resolves to Chrome Dev Tools compatible events
 * @param hermesProfile string
 * @param sourceMap string
 * @param bundleFileName string
 * @return Promise<DurationEvent[]>
 */
const transformer = async (
  hermesProfile: HermesCPUProfile,
  sourceMap?: SourceMap,
  bundleFileName?: string
): Promise<DurationEvent[]> => {
  const profileChunk = CpuProfilerModel.collectProfileEvents(hermesProfile);
  const profiler = new CpuProfilerModel(profileChunk);
  const chromeEvents = profiler.createStartEndEvents();
  if (sourceMap) {
    const events = applySourceMapsToEvents(
      sourceMap,
      chromeEvents,
      bundleFileName
    );
    return events;
  }
  return chromeEvents;
};

export default transformer;
export { SourceMap } from './types/SourceMap';
export { HermesCPUProfile } from './types/HermesProfile';
