import { test, expect } from '@playwright/test';
import { førstePåskedagPerÅr } from '../commonSrc/appConfig';

test('førstePåskedagPerÅr har en verdi for inneværende år', () => {
    const inneværendeÅr = new Date().getFullYear();
    expect(førstePåskedagPerÅr[inneværendeÅr]).toBeDefined();
});
