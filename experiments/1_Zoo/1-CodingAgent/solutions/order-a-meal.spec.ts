import { test, expect } from '@playwright/test'

// Reference solution for Exhibit 1. Open this if you fall behind — but read it, do not copy it.
// Every locator here is role-based and was verified against the live app.
//
// This is roughly what a good agent run produces. Compare it with what yours wrote:
// the interesting question at the debrief is not "did it pass" but "where did they differ".

test('order a meal and reach the confirmation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Delicious food, delivered fast' })).toBeVisible()

  // Restaurants are links, not cards — client-side routing to /restaurant/1.
  await page.getByRole('link', { name: /Burger Palace/ }).first().click()
  await expect(page.getByRole('heading', { name: 'Burger Palace', exact: true })).toBeVisible()

  // The quick-add "+" has no accessible name of its own, so scope it inside the menu item.
  // Still role-based — no CSS selector needed.
  const menuItem = page.getByRole('link', { name: /Classic Beef Burger/ })
  await menuItem.getByRole('button').click()

  // The header cart button is the reliable signal: its accessible name goes "Cart" -> "Cart 1".
  //
  // The "Added to cart!" toast is NOT reliable: it renders twice (a visible div plus an
  // aria-live status span), so getByText('Added to cart!') is a strict-mode violation, and it
  // auto-dismisses after about 4 seconds. Assert on state, not on a notification.
  const cart = page.getByRole('button', { name: 'Cart 1' })
  await expect(cart).toBeVisible()

  await cart.click()
  await expect(page.getByRole('dialog', { name: /Your Cart \(1\)/ })).toBeVisible()

  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
  await expect(page).toHaveURL(/\/checkout$/)

  await page.getByLabel('Full Name').fill('Marcel Veselka')
  await page.getByLabel('Street Address').fill('123 Main Street')
  await page.getByLabel('City').fill('New York')
  await page.getByLabel('Phone Number').fill('+1 (555) 123-4567')
  await page.getByRole('radio', { name: /Cash on Delivery/ }).click()

  await page.getByRole('button', { name: 'Place Order' }).click()

  // The confirmation renders in place — the URL stays /checkout. An agent that waits for a
  // navigation to /confirmation or /thank-you will hang here. Several do.
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible()
  await expect(page.getByText('Your order has been placed successfully.')).toBeVisible()

  // Order number is generated per order: FDR- plus six uppercase alphanumerics.
  await expect(page.getByText(/^Order #FDR-[A-Z0-9]{6}$/)).toBeVisible()
})
