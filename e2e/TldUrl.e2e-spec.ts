import type { Page, Request, Route } from '@playwright/test';
import { test, expect } from './global-setup';

const resultPath = '/en/result/226f6d4f44ae3f80/';

const isTldUrlRequest = (request: Request) =>
    request.postDataJSON()?.method === 'get_tld_url';

async function mockTldUrl(page: Page, handle: (route: Route) => Promise<void>) {
    await page.route(/\/api$/, async (route) => {
        if (isTldUrlRequest(route.request())) {
            await handle(route);
        } else {
            await route.fallback();
        }
    });
}

async function fulfillRpc(
    route: Route,
    payload:
        | { result: { tld?: string; url?: string } }
        | { error: { code: number; message: string } },
) {
    await route.fulfill({
        json: { jsonrpc: '2.0', id: route.request().postDataJSON().id, ...payload },
    });
}

async function expectResults(page: Page) {
    await expect(
        page.getByRole('heading', { name: 'Test result for results.afNiC.Fr' }),
    ).toBeVisible();
    await expect(page).toHaveTitle('results.afNiC.Fr – Zonemaster');
    await expect(page.locator('.zm-result')).toBeVisible();
}

test.describe('TLD URL on test results', () => {
    for (const url of ['https://www.afnic.fr/', 'http://www.afnic.fr/']) {
        test(`displays and links to ${url}`, async ({ page }) => {
            await mockTldUrl(page, (route) =>
                fulfillRpc(route, { result: { tld: 'fr', url } }),
            );
            const requestPromise = page.waitForRequest(isTldUrlRequest);

            await page.goto(resultPath);
            const request = await requestPromise;
            expect(request.postDataJSON().params).toEqual({
                domain: 'results.afNiC.Fr',
            });
            await expectResults(page);

            const button = page.locator('#zmTLDURLButton');
            const dialog = page.locator('#copyTLDURLDialog');
            await expect(button).toBeVisible();
            await expect(button).toHaveText('.fr Info');
            await expect(dialog).toBeHidden();
            await button.click();
            await expect(dialog).toBeVisible();
            await expect(
                dialog.getByText('Visit the registry to learn more about .fr.'),
            ).toBeVisible();
            await expect(dialog.locator('input[name="url"]')).toHaveValue(url);
            const faqLink = dialog.getByRole('link', {
                name: 'What is the TLD information link?',
            });
            await expect(faqLink).toHaveAttribute('href', '/en/faq/#tldurl');
            const openLink = dialog.getByRole('link', { name: 'Open TLD URL in a new tab' });
            await expect(openLink).toHaveAttribute('href', url);
            await expect(openLink).toHaveAttribute('target', '_blank');
            await expect(openLink).toHaveAttribute('rel', 'noopener noreferrer');
        });
    }

    const idnCases = [
        {
            description: 'decodes internationalized labels before display',
            domain: 'WWW.XN--BCHER-KVA.xn--p1ai.',
            unicodeDomain: 'WWW.bücher.рф.',
            heading: 'WWW.bücher.рф. (WWW.XN--BCHER-KVA.xn--p1ai.)',
            tld: 'xn--p1ai',
            displayTld: 'рф',
            buttonTld: 'рф',
        },
        {
            description: 'keeps Unicode labels and truncates long button text',
            domain: 'example.åbcdefgh',
            unicodeDomain: 'example.åbcdefgh',
            heading: 'example.åbcdefgh',
            tld: 'åbcdefgh',
            displayTld: 'åbcdefgh',
            buttonTld: 'åbcdefg...',
        },
        {
            description: 'keeps malformed A-labels and decodes valid ones',
            domain: 'xn--bcher-kva.xn--0.xn--abc-.xn--a',
            unicodeDomain: 'bücher.xn--0.xn--abc-.xn--a',
            heading: 'bücher.xn--0.xn--abc-.xn--a (xn--bcher-kva.xn--0.xn--abc-.xn--a)',
            tld: 'xn--a',
            displayTld: 'xn--a',
            buttonTld: 'xn--a',
        },
    ];

    for (const idnCase of idnCases) {
        const { description, domain, unicodeDomain, heading, tld, displayTld, buttonTld } =
            idnCase;
        test(description, async ({ page }) => {
            await page.route(/\/api$/, async (route) => {
                const { id, method } = route.request().postDataJSON();
                if (method !== 'get_test_results') {
                    await route.fallback();
                    return;
                }

                await route.fulfill({
                    json: {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            params: { domain },
                            created_at: '2022-11-23T16:38:17Z',
                            results: [],
                            testcase_descriptions: {},
                        },
                    },
                });
            });
            await mockTldUrl(page, (route) => {
                expect(route.request().postDataJSON().params).toEqual({ domain });
                return fulfillRpc(route, { result: { tld, url: 'https://example.com/' } });
            });

            await page.goto(resultPath);
            await expect(
                page.getByRole('heading', { name: `Test result for ${heading}`, exact: true }),
            ).toBeVisible();
            await expect(page).toHaveTitle(`${unicodeDomain} – Zonemaster`);

            const button = page.locator('#zmTLDURLButton');
            await expect(button).toHaveText(`.${buttonTld} Info`);
            await expect(button).toHaveAttribute('title', `.${displayTld} Info`);
            await button.click();
            await expect(
                page.getByText(`Visit the registry to learn more about .${displayTld}.`),
            ).toBeVisible();
        });
    }

    const hiddenButtonCases = [
        {
            description: 'the URL is omitted',
            response: { result: { tld: 'xn--p1ai' } },
        },
        {
            description: 'the URL is empty',
            response: { result: { url: '' } },
        },
        {
            description: 'the backend returns an RPC error',
            response: { error: { code: -32601, message: 'Method not found' } },
        },
        {
            description: 'the request fails',
            response: null,
        },
    ];

    for (const { description, response } of hiddenButtonCases) {
        test(`hides the button when ${description}`, async ({ page }) => {
            const errors: Error[] = [];
            page.on('pageerror', (error) => errors.push(error));
            await mockTldUrl(page, (route) =>
                response ? fulfillRpc(route, response) : route.abort('failed'),
            );
            const settled = response
                ? page.waitForEvent('requestfinished', isTldUrlRequest)
                : page.waitForEvent('requestfailed', isTldUrlRequest);

            await page.goto(resultPath);
            await settled;
            await expectResults(page);
            await expect(page.locator('#zmTLDURLButton')).toBeHidden();
            expect(errors).toEqual([]);
        });
    }

    test('shows results while waiting for the TLD URL', async ({ page }) => {
        let releaseRequest!: () => void;
        const pending = new Promise<void>((resolve) => {
            releaseRequest = resolve;
        });
        await mockTldUrl(page, async (route) => {
            await pending;
            await fulfillRpc(route, { result: { url: 'https://www.afnic.fr/' } });
        });
        const requestPromise = page.waitForRequest(isTldUrlRequest);

        try {
            await page.goto(resultPath, { waitUntil: 'domcontentloaded' });
            await requestPromise;
            await expectResults(page);
            await expect(page.locator('#zmTLDURLButton')).toBeHidden();
        } finally {
            releaseRequest();
        }

        const button = page.locator('#zmTLDURLButton');
        await expect(button).toHaveText('TLD URL');
        await button.click();
        const dialog = page.locator('#copyTLDURLDialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByText('Visit the registry', { exact: false })).toHaveCount(0);
    });
});
