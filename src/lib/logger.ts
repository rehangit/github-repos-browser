const LOG_LEVEL = localStorage.getItem('LOG_LEVEL') || '';

function contextLogger(...args: any[]) {
  const e = new Error();
  const context = e.stack?.split('\n')?.[2]?.match(/at (.+) .+\/(src\/.+\.(ts|js))/);
  console.log(`[${context?.[2]}:${context?.[1]}]`, ...args);
}

function noop() {}

const log = LOG_LEVEL?.toLowerCase() === 'debug' ? contextLogger : noop;
export default log;
