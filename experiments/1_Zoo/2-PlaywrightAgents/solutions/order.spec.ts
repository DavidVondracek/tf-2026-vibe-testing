import { test, expect } from '@playwright/test'

// Reference solution for Exhibit 2: what the **generator** produces from bullet 1.1 of
// `order.md` in this folder. Plan first, then code — and the code traces back to the plan
// line by line, which is the property that makes this reviewable.
//
// Yours will not be identical. Compare the shape, not the characters.

test('1.1 order a single dish with cash on delivery', async ({ page }) => {
  // 1. Open the home page
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Delicious food, delivered fast' })).toBeVisible()

  // 2. Open the "Burger Palace" restaurant
  await page.getByRole('link', { name: /Burger Palace/ }).first().click()
  await expect(page.getByRole('heading', { name: 'Burger Palace', exact: true })).toBeVisible()

  // 3. Add "Classic Beef Burger" using the quick-add control
  await page.getByRole('link', { name: /Classic Beef Burger/ }).getByRole('button').click()

  // 4. Verify the header cart shows one item
  const cart = page.getByRole('button', { name: 'Cart 1' })
  await expect(cart).toBeVisible()

  // 5. Open the cart and verify it lists the dish
  await cart.click()
  const drawer = page.getByRole('dialog', { name: /Your Cart \(1\)/ })
  await expect(drawer).toBeVisible()
  await expect(drawer.getByText('Classic Beef Burger')).toBeVisible()

  // 6. Proceed to checkout
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()

  // 7. Fill in the delivery details
  await page.getByLabel('Full Name').fill('Marcel Veselka')
  await page.getByLabel('Street Address').fill('123 Main Street')
  await page.getByLabel('City').fill('New York')
  await page.getByLabel('Phone Number').fill('+1 (555) 123-4567')

  // 8. Select "Cash on Delivery"
  await page.getByRole('radio', { name: /Cash on Delivery/ }).click()

  // 9. Place the order
  await page.getByRole('button', { name: 'Place Order' }).click()

  // 10. Verify the confirmation, with an order number
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible()
  await expect(page.getByText(/^Order #FDR-[A-Z0-9]{6}$/)).toBeVisible()
})
