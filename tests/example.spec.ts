import { test, expect } from '@playwright/test';

test.describe('Basic Application Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Add your assertions here based on your application
    expect(page.url()).toBe('http://localhost:5001/');
  });

  test('API ping endpoint works', async ({ request }) => {
    const response = await request.get('/api/ping');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    // Add assertions based on your API response
    console.log('API Response:', data);
  });
});
