import { test, expect } from '@playwright/test';

const routes = ['/', '/buket/', '/gantungan/', '/rangkai/', '/info/'];

test.describe('Mestiere Fiolet multi-page experience', () => {
  test('all public pages render without page or console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page).toHaveTitle(/Mestiere Fiolet/i);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });

  test('catalogue pages expose product choices and route to the order studio', async ({ page }) => {
    await page.goto('/buket/');
    await expect(page.getByRole('tab', { name: /Single Flower Bucket/i })).toBeVisible();
    await page.getByRole('tab', { name: /Single Flower Bucket/i }).focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('tab', { name: /^Flower Bucket/i })).toHaveAttribute('aria-selected', 'true');
    await page.getByRole('tab', { name: /Idol Bucket/i }).click();
    await expect(page.getByRole('tabpanel').getByText('START FROM 25K')).toBeVisible();
    await expect(page.getByRole('tabpanel').getByRole('link', { name: /Rangkai pesanan/i })).toHaveAttribute('href', '/rangkai/');
    await page.goto('/gantungan/');
    await expect(page.getByRole('tab', { name: /Jellyfish/i })).toBeVisible();
  });

  test('order studio calculates, resets, and creates a safe WhatsApp link', async ({ page }) => {
    await page.goto('/rangkai/');
    await page.getByRole('tab', { name: /Bunga satuan/i }).click();
    await page.getByRole('button', { name: 'Tambah Lily' }).click();
    await page.getByRole('tab', { name: /Gantungan/i }).click();
    await page.getByRole('button', { name: 'Tambah Jellyfish' }).click();
    const orderLink = page.getByRole('link', { name: /Kirim ke WhatsApp/i });
    await expect(orderLink).toHaveAttribute('href', /wa\.me\/6285721345678/);
    await expect(orderLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('.summary-total')).toContainText('15.000');
    await page.getByRole('button', { name: /Reset pilihan/i }).click();
    await expect(page.locator('.summary-total')).toContainText('0');
  });

  test('mobile and desktop layouts do not overflow horizontally', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflowing, route).toBeFalsy();
    }
  });

  test('responsive layouts fit small phones, tablets, and desktop widths with touch-sized controls', async ({ page }) => {
    for (const width of [320, 360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const homeLayout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
        internal: Array.from(document.querySelectorAll('body *')).filter((element) => element.scrollWidth > element.clientWidth + 1).slice(0, 8).map((element) => ({
          tag: element.tagName,
          className: typeof element.className === 'string' ? element.className : '',
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        })),
        offenders: Array.from(document.querySelectorAll('body *')).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.right > window.innerWidth + 1 || rect.left < -1;
        }).slice(0, 8).map((element) => ({
          tag: element.tagName,
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(element.getBoundingClientRect().left),
          right: Math.round(element.getBoundingClientRect().right),
        })),
      }));
      expect(homeLayout.overflow, `home at ${width}px: ${JSON.stringify(homeLayout)}`).toBeFalsy();
      if (width <= 390) {
        const menuTarget = await page.locator('.mobile-nav summary').boundingBox();
        expect(menuTarget?.width).toBeGreaterThanOrEqual(44);
        expect(menuTarget?.height).toBeGreaterThanOrEqual(44);
      }

      await page.goto('/rangkai/');
      const orderOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(orderOverflow, `order studio at ${width}px`).toBeFalsy();

      if (width <= 390) {
        const controls = await page.locator('.quantity button').evaluateAll((buttons) => buttons.map((button) => {
          const rect = button.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        }));
        expect(controls.length).toBeGreaterThan(0);
        expect(controls.every(({ width: controlWidth, height }) => controlWidth >= 44 && height >= 44)).toBeTruthy();
        const resetTarget = await page.getByRole('button', { name: /Reset pilihan/i }).boundingBox();
        expect(resetTarget?.height).toBeGreaterThanOrEqual(44);
        await page.goto('/info/');
        const faqTarget = await page.locator('.faq-list summary').first().boundingBox();
        expect(faqTarget?.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('reduced-motion preference does not hide essential content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Hadiah kecil/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Rangkai pesanan/i }).first()).toBeVisible();
  });

  test('unknown routes show the branded not-found page', async ({ page }) => {
    await page.goto('/not-a-real-route');
    await expect(page.getByRole('heading', { name: /Halaman ini belum ada/i })).toBeVisible();
  });

  test('order studio preselects items from URL params and supports copying order details', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/rangkai/?item=bucket-idol&cat=bucket');
    await expect(page.getByRole('tab', { name: /Paket buket/i })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.summary-total')).toContainText('25.000');
    
    const copyButton = page.getByRole('button', { name: /Salin Rincian Pesanan/i });
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(page.getByText('Rincian Tersalin!')).toBeVisible();
  });

  test('quantity counter stepper disables decrement at zero and re-enables on increment', async ({ page }) => {
    await page.goto('/rangkai/');
    await page.getByRole('tab', { name: /Bunga satuan/i }).click();
    const minusLily = page.getByRole('button', { name: 'Kurangi Lily' });
    const plusLily = page.getByRole('button', { name: 'Tambah Lily' });

    await expect(minusLily).toBeDisabled();
    await plusLily.click();
    await expect(minusLily).toBeEnabled();
    await expect(page.locator('.summary-total')).toContainText('7.000');
    await minusLily.click();
    await expect(minusLily).toBeDisabled();
    await expect(page.locator('.summary-total')).toContainText('0');
  });

  test('faq accordion items expand and display answer content correctly', async ({ page }) => {
    await page.goto('/info/');
    const firstFaqDetails = page.locator('.faq-list details').first();
    const firstFaqSummary = firstFaqDetails.locator('summary');
    await expect(firstFaqDetails).not.toHaveAttribute('open', '');
    await firstFaqSummary.click();
    await expect(firstFaqDetails).toHaveAttribute('open', '');
  });
});
