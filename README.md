# Customer Hub

Build a single, standalone Customer Details Management Module only.

Objective

Create a clean, modern, professional Customer Details List with full CRUD functionality:

Add Customer

View Customer List

Edit Customer

Delete Customer

Do NOT create any other modules such as Dashboard, Products, Orders, Billing, Reports, etc.

Customer Fields

Each customer should have:

Customer Name — Required

Address Detail — Required, multiline textarea

Place — Required

PIN Code — Required, exactly 6 digits

State — Required, searchable dropdown

District — Required, searchable dropdown

Mobile Number — Required, 10-digit Indian mobile number

Customer List

Create a professional customer listing screen.

Desktop / Laptop:

Display customers in a clean data table.

Columns:

Customer Name

Mobile Number

Address

Place

District

State

PIN Code

Actions

Actions should contain:

Edit

Delete

Mobile:

Do NOT force the desktop table into a tiny layout.

Convert each customer into a clean responsive card.

Show important information clearly.

Keep Edit and Delete actions easily accessible.

Tablet:

Use a responsive table/card layout depending on available width.

Add Customer

Add a prominent "+ Add Customer" button.

When clicked, open a professional form using either:

Responsive modal/drawer on desktop

Full-screen or comfortable bottom-sheet style form on mobile

Form layout:

Customer Name

Mobile Number

Address Detail

Place

State

District

PIN Code

Use proper labels, placeholders and validation messages.

Edit Customer

Clicking Edit should open the same form with the existing customer information pre-filled.

Allow the user to update the customer details and save the changes.

Delete Customer

When Delete is clicked:

Show a confirmation dialog.

Message: "Are you sure you want to delete this customer?"

Provide Cancel and Delete buttons.

Do not delete immediately without confirmation.

Validation

Implement proper client-side validation:

Customer Name: Required

Address Detail: Required

Place: Required

State: Required

District: Required

PIN Code: Exactly 6 numeric digits

Mobile Number: Exactly 10 numeric digits

Prevent submission when required fields are invalid.

Display clear inline validation messages.

Search

Add a customer search field above the list.

Search should work across:

Customer Name

Mobile Number

Place

District

PIN Code

Search should update the list smoothly as the user types.

Empty State

If there are no customers:
Show a clean empty state such as:

"No customers found"

with a "+ Add Customer" button.

UI / UX Design

Make the UI:

Modern

Minimal

Professional

Clean

Business/ERP-style

Easy to use

Not overly colorful

Good spacing and typography

Clear visual hierarchy

Use:

Rounded cards

Subtle borders

Soft shadows where appropriate

Consistent button styles

Clear icons for Edit/Delete

Professional form controls

Proper hover and focus states

Responsive Requirement — IMPORTANT

The entire module must be fully responsive and work properly on:

Mobile phones: 320px+

Tablets: 768px+

Laptops: 1024px+

Desktop: 1440px+

Follow a mobile-first responsive design.

Do not allow:

Horizontal page overflow

Broken tables

Overlapping buttons

Text getting cut off

Forms becoming unusably narrow

On mobile, stack form fields vertically.

On larger screens, use a sensible 2-column form layout where appropriate.

Technical Quality

Write clean, maintainable and reusable code.

Use reusable components for:

Customer List

Customer Card

Customer Form

Delete Confirmation Dialog

Search

Use proper loading, success and error states.

Show a success toast after:

Customer added

Customer updated

Customer deleted

Example:
"Customer added successfully"
"Customer updated successfully"
"Customer deleted successfully"

Important Scope Restriction

This request is ONLY for the Customer Details Management Module.

Do not build:

Dashboard

Authentication

Billing

Products

Orders

Reports

Payments

Other ERP modules

Keep the implementation focused exclusively on Customer CRUD management.

The final result should look like a polished production-ready Customer Management screen for a modern business ERP application, with excellent usability across mobile, tablet and desktop.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb05c052-44e7-4985-bdae-f1f8e31f9e62).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
