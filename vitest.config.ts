/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['json', 'lcov'],
			exclude: [
				'**/{husky,lint-staged}.config.*',
				'**/.{eslint,prettier,remark}rc.{?(c|m)js,yml}',
			],
		},
	},
});
