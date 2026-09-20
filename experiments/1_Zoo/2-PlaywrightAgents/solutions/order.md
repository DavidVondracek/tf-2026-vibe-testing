# Order a meal — test plan

Reference version of the artifact the **planner** writes into `specs/`. Yours will differ in
wording and probably in how it groups things; that is fine. What matters is that it reads like
this — numbered, in the language of the app, with no code in it.

This is the file to read out loud at the debrief. A product owner can tell you bullet 1.3 is
wrong. Nobody can tell you a locator is wrong.

## 1. Placing an order

### 1.1 Order a single dish with cash on delivery

1. Open the home page
2. Open the "Burger Palace" restaurant
3. Add "Classic Beef Burger" to the cart using the quick-add control on the menu item
4. Verify the header cart shows one item
5. Open the cart and verify it lists "Classic Beef Burger"
6. Proceed to checkout
7. Fill in name, street address, city and phone number
8. Select "Cash on Delivery"
9. Place the order
10. Verify the confirmation appears with an order number

### 1.2 Order with the default payment method

1. Add any dish to the cart
2. Proceed to checkout and fill the delivery details
3. Place the order without changing the payment method
4. Verify the order is confirmed

### 1.3 Add two different dishes before checking out

1. Add "Classic Beef Burger" to the cart
2. Add a second dish from the same restaurant
3. Verify the header cart shows two items
4. Open the cart and verify both dishes are listed
5. Complete the order and verify the confirmation

## 2. The cart

### 2.1 An empty cart offers no way to check out

1. Open the cart without adding anything
2. Verify it says the cart is empty
3. Verify there is no way to proceed to checkout from it

### 2.2 Checking out with an empty cart shows an empty state

1. Go straight to the checkout page with nothing in the cart
2. Verify the page says the cart is empty and offers a way back to the restaurants
3. Verify no delivery form is shown

## 3. Order tracking

### 3.1 A confirmed order can be tracked

1. Complete an order
2. Choose to track the order
3. Verify the tracking view shows the order number from the confirmation
