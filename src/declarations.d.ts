// Extra variables that live on Global that
// will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var APP_VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var HMR: boolean;
declare var IS_DEV: boolean;
declare var TRAVIS: boolean;

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor {
  stackTraceLimit: number;
}
