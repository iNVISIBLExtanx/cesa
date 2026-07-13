import { describe, expect, it } from 'vitest';
import { CESA_VERSION } from './index.js';

describe('CESA_VERSION', () => {
  it('is a non-empty semver-like string', () => {
    expect(CESA_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
