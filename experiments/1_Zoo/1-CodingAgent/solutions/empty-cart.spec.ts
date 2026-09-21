import { test, expect } from '@playwright/test'

// Reference solution for the Exhibit 1 bonus: the negative case.
//
// Ask an agent for "checkout with an empty cart" and it will usually write a test that expects a
// validation error — because that is what most checkouts do, and the model is pattern-matching on
// every other checkout it has ever seen rather than on this one.
//
// This app does something else entirely. Both tests below pass against the real app. If your
// agent's version asserts an error message, a toast, or a disabled button, it invented all three.

test('an empty cart shows a guarded empty state, not an error', async ({ page }) => {
  await page.goto('/checkout')

  // Not a redirect — the URL stays put.
  await expect(page).toHaveURL(/\/checkout$/)

  // Not an error. An empty-state view, with different copy from the cart drawer's empty state.
  await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible()
  await expect(page.getByText('Add some items before checking out.')).toBeVisible()

  // The form and the button are not rendered at all. Note `toHaveCount(0)`, not `toBeDisabled()`
  // — an agent that reaches for `toBeDisabled()` here fails, because there is no button to disable.
  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0)
  await expect(page.locator('input')).toHaveCount(0)

  // No alert anywhere on the page.
  await expect(page.getByRole('alert')).toHaveCount(0)
})

test('the checkout form has no validation at all', async ({ page }) => {
  // This is the bigger trap. Put something in the cart, then submit a completely empty form.
  await page.goto('/')
  await page.getByRole('link', { name: /Burger Palace/ }).first().click()
  await page.getByRole('link', { name: /Classic Beef Burger/ }).getByRole('button').click()
  await page.getByRole('button', { name: 'Cart 1' }).click()
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()

  // Type nothing. Not one of the six inputs carries `required`, and there is no JS validation.
  await page.getByRole('button', { name: 'Place Order' }).click()

  // The order goes through.
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible()
  await expect(page.getByText(/^Order #FDR-[A-Z0-9]{6}$/)).toBeVisible()
  await expect(page.getByRole('alert')).toHaveCount(0)
})
