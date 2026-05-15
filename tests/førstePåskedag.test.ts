import { test, expect } from '@playwright/test';
import { førstePåskedagPerÅr } from '../packages/common/src/appConfig';

test('førstePåskedagPerÅr har en verdi for inneværende år', () => {
    const inneværendeÅr = new Date().getFullYear();
    expect(førstePåskedagPerÅr[inneværendeÅr]).toBeDefined();
});
