/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';
import fs from 'fs';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
  middleware: [
    function spaFallback(context, next) {
      if (
        context.request.method === 'GET' &&
        !context.path.startsWith('/node_modules') &&
        !context.path.startsWith('/public') &&
        !context.path.includes('.')
      ) {
        context.response.status = 200;
        context.response.set('Content-Type', 'text/html');
        context.response.body = fs.readFileSync('index.html', 'utf-8');
        return;
      }
      return next();
    },
  ],
};
