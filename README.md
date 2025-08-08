# Chapa Payment Integration Dashboard

A Next.js-based dashboard application that integrates with Chapa Payment API to handle payment transactions with role-based access control.

## Features

- User authentication with role-based access (User, Admin, Super Admin)
- Secure payment initialization using Chapa API
- Transaction history tracking
- Responsive design with mobile support
- Role-specific dashboards

## Chapa API Integration

### Endpoints Used

1. **Initialize Payment**
   - **Endpoint**: `https://api.chapa.co/v1/transaction/initialize`
   - **Method**: POST


### Integration Details

1. **Frontend (React/Next.js)**:
   - Payment form collects user details and amount
   - Form submission triggers API call to Next.js API route
   - Handles payment response and redirects to Chapa checkout

2. **Backend (Next.js API Routes)**:
   - `/api/initialize` - Handles payment initialization

## Prerequisites

- Node.js (v22 or later)
- npm or yarn
- Chapa API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/estifan/chapa-frontend-interview-assignment
   cd chapa-frontend-interview-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   To make the app easy to run no .env is used


4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Testing the Application

### Test Accounts

1. **Regular User**
   - Email: `user@chapa.com`
   - Password: `password`
   - Access: User Dashboard

2. **Admin**
   - Email: `admin@chapa.com`
   - Password: `password`
   - Access: Admin Dashboard

3. **Super Admin**
   - Email: `superadmin@chapa.com`
   - Password: `password`
   - Access: Super Admin Dashboard

### Testing Payments

1. Log in as a regular user
2. Click on "New Transaction"
3. Fill in the payment details
4. Submit the form
5. You'll be redirected to Chapa's payment page
6. Use test card details (provided by Chapa) to complete the payment

## Project Structure

```
/app
  /api
    /initialize
      route.js      # Payment initialization endpoint
    /verify
      route.js      # Payment verification endpoint
  /dashboard
    /admin         # Admin dashboard
    /superadmin    # Super Admin dashboard
    /user          # User dashboard
  /components      # Reusable components
  /context         # React context providers
  /styles          # Global styles
```

## Dependencies

- Next.js 14
- React 18
- Tailwind CSS 4
- React Icons
