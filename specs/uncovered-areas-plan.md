# Uncovered Areas Test Plan

## Application Overview

Plan for TutorialsNinja OpenCart demo areas not covered by existing suites: brands, site map, category sorting/limit/view/pagination, search refinement, auth-guarded pages, logout, empty states and not-found pages. All scenarios are read-only/guest: start from a fresh browser context (no cookies, empty cart and wishlist, not logged in), use relative URLs (index.php?route=...), and never place orders, pay, or change shared account credentials. Observed facts: Desktops has 12 products, Laptops & Notebooks has 5; sort options are Default, Name (A-Z), Name (Z-A), Price (Low > High), Price (High > Low), Rating (Highest), Rating (Lowest), Model (A-Z), Model (Z-A); Show options 20/25/50/75/100; brands Apple, Canon, Hewlett-Packard, HTC, Palm, Sony under index letters A, C, H, P, S.

## Test Scenarios

### 1. Brands

**Seed:** `tests/seed.spec.ts`

#### 1.1. Brands page lists all brands grouped by letter

**File:** `tests/brands/brands-index.spec.ts`

**Steps:**
  1. Open index.php?route=product/manufacturer
    - expect: Heading 'Find Your Favorite Brand' and 'Brand Index' are shown
    - expect: Letters A, C, H, P, S shown
    - expect: Apple, Canon, Hewlett-Packard, HTC, Palm, Sony are listed under their letters
  2. Navigate instead via footer Extras > Brands from the home page
    - expect: Same page loads

#### 1.2. Brand link opens brand product listing

**File:** `tests/brands/brand-listing.spec.ts`

**Steps:**
  1. On the Brands page click 'Apple'
    - expect: URL contains product/manufacturer/info&manufacturer_id=8
    - expect: Heading 'Apple' and several product cards shown (e.g. Apple Cinema 30", iPhone)
    - expect: Sort, Show, list/grid controls present
  2. Sort by 'Price (Low > High)'
    - expect: Prices ascend; URL contains sort=p.price&order=ASC

#### 1.3. Invalid brand id shows not-found message

**File:** `tests/brands/brand-invalid.spec.ts`

**Steps:**
  1. Open index.php?route=product/manufacturer/info&manufacturer_id=99
    - expect: 'Brand not found!' shown with a Continue button
    - expect: Continue leads to a valid page (Home or Brands)

### 2. Site Map

**Seed:** `tests/seed.spec.ts`

#### 2.1. Site map lists categories and information links

**File:** `tests/sitemap/sitemap-content.spec.ts`

**Steps:**
  1. Click footer Customer Service > Site Map
    - expect: URL contains information/sitemap, heading 'Site Map'
    - expect: Top-level categories (Desktops, Laptops & Notebooks, Components, Tablets, Software, Phones & PDAs, Cameras, MP3 Players) with subcategories (PC, Mac, Macs, Windows, Monitors...)
    - expect: Links to Special Offers, My Account, Account Information, Password, Address Book, Order History, Downloads, Shopping Cart, Checkout, Search, About Us, Delivery Information, Privacy Policy, Terms & Conditions, Contact Us

#### 2.2. Site map links navigate correctly

**File:** `tests/sitemap/sitemap-links.spec.ts`

**Steps:**
  1. Click 'Mac' under Desktops
    - expect: Mac category page loads with heading 'Mac'
  2. Go back and click 'About Us'
    - expect: About Us information page loads
  3. Go back and click 'Address Book' as a guest
    - expect: Redirected to Account Login page

### 3. Category Listing Controls

**Seed:** `tests/seed.spec.ts`

#### 3.1. Sort dropdown contains all nine options

**File:** `tests/category-controls/sort-options.spec.ts`

**Steps:**
  1. Open index.php?route=product/category&path=20 and read the Sort By dropdown
    - expect: Options in order: Default, Name (A - Z), Name (Z - A), Price (Low > High), Price (High > Low), Rating (Highest), Rating (Lowest), Model (A - Z), Model (Z - A)

#### 3.2. Sort by name A-Z and Z-A

**File:** `tests/category-controls/sort-name.spec.ts`

**Steps:**
  1. Select 'Name (A - Z)'
    - expect: URL has sort=pd.name&order=ASC; product names alphabetical ascending (case-insensitive)
  2. Select 'Name (Z - A)'
    - expect: Product order exactly reversed

#### 3.3. Sort by price low-high and high-low

**File:** `tests/category-controls/sort-price.spec.ts`

**Steps:**
  1. Select 'Price (Low > High)'
    - expect: Displayed prices non-decreasing (special price used where shown; first item Canon EOS 5D at $98.00)
  2. Select 'Price (High > Low)'
    - expect: Prices non-increasing

#### 3.4. Sort by rating and model

**File:** `tests/category-controls/sort-rating-model.spec.ts`

**Steps:**
  1. Select 'Rating (Highest)' then 'Rating (Lowest)'
    - expect: Page reloads with sort=rating and ASC/DESC; same product set, order changes; no errors
  2. Select 'Model (A - Z)' then 'Model (Z - A)'
    - expect: URL has sort=p.model; same 12 products; order reverses between the two

#### 3.5. Show limit dropdown options and persistence

**File:** `tests/category-controls/limit.spec.ts`

**Steps:**
  1. Read the Show dropdown on Desktops
    - expect: Options 20, 25, 50, 75, 100 with 20 selected
  2. Select 25
    - expect: URL has limit=25; text 'Showing 1 to 12 of 12 (1 Pages)'; 12 products

#### 3.6. List and grid view toggle

**File:** `tests/category-controls/view-toggle.spec.ts`

**Steps:**
  1. Click List view button
    - expect: Product cards switch to full-width list layout; button state active
  2. Click Grid view button, then reload
    - expect: Grid layout shown; view preference persists across reload per site behavior (record actual)

#### 3.7. Pagination via limit URL parameter

**File:** `tests/category-controls/pagination.spec.ts`

**Steps:**
  1. Open index.php?route=product/category&path=20&limit=5 (UI minimum is 20, so use the URL parameter)
    - expect: 5 products, 'Showing 1 to 5 of 12 (3 Pages)', pagination 1 2 3 > >|
  2. Click page 3
    - expect: 2 products; text 'Showing 11 to 12 of 12 (3 Pages)'
  3. Open page=99
    - expect: No products shown, no server error

#### 3.8. Subcategory refine links and unknown category

**File:** `tests/category-controls/refine-and-404.spec.ts`

**Steps:**
  1. Open Desktops category and look at 'Refine Search'
    - expect: PC (0) and Mac (1) links shown
  2. Open index.php?route=product/category&path=999
    - expect: 'Category not found!' with Continue button (HTTP 404)

### 4. Search Refinement

**Seed:** `tests/seed.spec.ts`

#### 4.1. Search page criteria controls

**File:** `tests/search-refine/criteria-controls.spec.ts`

**Steps:**
  1. Open index.php?route=product/search
    - expect: Search Criteria area, category dropdown with 'All Categories' plus Desktops, PC, Mac, Laptops & Notebooks ... (about 39 options, nested ones indented)
    - expect: Checkboxes 'Search in subcategories' and 'Search in product descriptions'

#### 4.2. Search in product descriptions widens results

**File:** `tests/search-refine/description.spec.ts`

**Steps:**
  1. Search 'mac' with description unchecked
    - expect: Results: iMac, MacBook, MacBook Air, MacBook Pro
  2. Tick 'Search in product descriptions' and click Search
    - expect: Results also include Apple Cinema 30", iPhone (6 products in total)

#### 4.3. Category dropdown restricts results

**File:** `tests/search-refine/category-filter.spec.ts`

**Steps:**
  1. Search 'mac' choosing category 'Desktops' without subcategories
    - expect: Only products directly in Desktops matching are shown, or the no-match message; record actual
  2. Tick 'Search in subcategories' and search again
    - expect: Products from Mac subcategory (e.g. iMac) appear

#### 4.4. Search no results empty state

**File:** `tests/search-refine/no-results.spec.ts`

**Steps:**
  1. Open index.php?route=product/search&search=zzzzqq
    - expect: Heading 'Search - zzzzqq'; text 'There is no product that matches the search criteria.'; criteria form still shown; no product cards

#### 4.5. Search with empty term and special characters

**File:** `tests/search-refine/edge-input.spec.ts`

**Steps:**
  1. Submit the header search with an empty box
    - expect: Search page shown with no results list and no error
  2. Search for <script>alert(1)</script> and for %
    - expect: No alert dialog; input is escaped in heading; no-match message shown

### 5. Guarded Pages Redirect

**Seed:** `tests/seed.spec.ts`

#### 5.1. Account-only pages redirect guests to login

**File:** `tests/guarded/redirect-login.spec.ts`

**Steps:**
  1. For each route (account/address, account/order, account/download, account/reward, account/transaction, account/newsletter, account/edit, account/password, account/wishlist, account/return) navigate as a guest
    - expect: Each ends on route=account/login with 'New Customer' and 'Returning Customer' sections visible

#### 5.2. Guarded pages from footer and sitemap links

**File:** `tests/guarded/redirect-from-links.spec.ts`

**Steps:**
  1. Click footer 'Order History' then 'Newsletter' as guest
    - expect: Redirected to login each time
  2. Click header 'Wish List (0)'
    - expect: Redirected to login

#### 5.3. Affiliate login is publicly reachable

**File:** `tests/guarded/affiliate.spec.ts`

**Steps:**
  1. Click footer Affiliate
    - expect: Page 'Affiliate Program' with description and 'New Affiliate' section loads without requiring login (do not submit any registration)

### 6. Logout

**Seed:** `tests/seed.spec.ts`

#### 6.1. Logout page as guest

**File:** `tests/logout/logout-guest.spec.ts`

**Steps:**
  1. Open index.php?route=account/logout without logging in
    - expect: 'Account Logout' heading with 'You have been logged off your account' message and Continue button; Continue returns to home

#### 6.2. Logout after login ends session (uses the provided test account, read-only)

**File:** `tests/logout/logout-session.spec.ts`

**Steps:**
  1. Log in with the project's existing test credentials, then open My Account dropdown > Logout
    - expect: Logout confirmation shown; header dropdown now offers Register/Login instead of Logout
  2. Navigate to account/order
    - expect: Redirected to login, confirming the session ended
  3. Use browser Back
    - expect: Account page is not accessible without re-authenticating (redirects to login)

### 7. Empty States

**Seed:** `tests/seed.spec.ts`

#### 7.1. Empty shopping cart page

**File:** `tests/empty-states/empty-cart.spec.ts`

**Steps:**
  1. Open index.php?route=checkout/cart
    - expect: Heading 'Shopping Cart'; text 'Your shopping cart is empty!'; Continue button leads to home; header shows '0 item(s) - $0.00'
  2. Open index.php?route=checkout/checkout as guest with empty cart
    - expect: Redirected to the cart page (record actual)

#### 7.2. Wishlist for guests

**File:** `tests/empty-states/guest-wishlist.spec.ts`

**Steps:**
  1. Open index.php?route=account/wishlist as guest
    - expect: Redirected to login page (wishlist is account-only); header shows 'Wish List (0)'

#### 7.3. Empty compare and empty category pages

**File:** `tests/empty-states/empty-compare.spec.ts`

**Steps:**
  1. Open index.php?route=product/compare with nothing added
    - expect: Page shows 'You have not chosen any products to compare.' (record actual) with Continue button
  2. Open Software category or any category reporting no products
    - expect: 'There are no products to list in this category.' with Continue, if such category exists; otherwise note and skip

### 8. Not Found Pages

**Seed:** `tests/seed.spec.ts`

#### 8.1. Unknown route and unknown product show not-found

**File:** `tests/not-found/unknown.spec.ts`

**Steps:**
  1. Open index.php?route=product/product&product_id=99999
    - expect: 'Product not found!' message with Continue button
  2. Open index.php?route=information/information&information_id=999
    - expect: 'Information Page Not Found!' (or equivalent) with Continue
  3. Open index.php?route=does/not/exist
    - expect: 'Page Not Found!' content; site header and footer still render
