const LOG_LEVEL = localStorage.getItem('LOG_LEVEL') || '';

function contextLogger(...args: any[]) {
  const e = new Error();
  const context = e.stack?.split('\n')?.[2]?.match(/at (.+) /)?.[1];
  console.log(`[${context}]`, ...args);
}

function noop() {}

const log = LOG_LEVEL?.toLowerCase() === 'debug' ? contextLogger : noop;
export default log;
