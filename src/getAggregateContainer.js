import AggregateContainer from './AggregateContainer';

const containerIds = new WeakMap;
let nextContainerId = 0;

function getContainerId(container) {
  let id = containerIds.get(container);
  if (id === void 0) {
    id = nextContainerId++;
    containerIds.set(container, id);
  }

  return id;
}

function getCacheKey(fragmentSpecs) {
  return JSON.stringify(
    Object.entries(fragmentSpecs)
      .map(([fragmentName, { component, queryName }]) =>
        [fragmentName, getContainerId(component), queryName]
      )
      .sort(([a], [b]) => a.localeCompare(b))
  );
}

const containerCache = new Map;

export default function getAggregateContainer(fragmentSpecs) {
  const cacheKey = getCacheKey(fragmentSpecs);

  let container = containerCache.get(cacheKey);
  if (!container) {
    container = new AggregateContainer(fragmentSpecs);
    containerCache.set(cacheKey, container);
  }

  return container;
}
