# ASR Pharmacy - Complete Codebase Flow Analysis

## 1. Application Initialization Flow

### Entry Point: `src/main.jsx`
```
main.jsx
├── StrictMode (React development mode)
├── BrowserRouter (React Router setup)
├── Redux Provider (store)
├── PersistGate (Redux Persist - restores state from localStorage)
└── App Component
```

**Key Points:**
- Redux Persist is configured to persist the `user` slice to localStorage
- This allows users to stay logged in after page refresh

---

## 2. App Component Flow (`src/App.jsx`)

### Initial Setup
1. **State Restoration** (useEffect)
   - Checks localStorage for `token` and `user`
   - If found, dispatches `setUser` action to restore Redux state
   - Sets `restoring` to false when complete

2. **User Companies Fetch** (useGetUserCompaniesQuery)
   - Fetches user's companies from API
   - Updates Redux state with `updateUserCompanies` action

3. **Browser History Management**
   - Prevents back button navigation (pushes state to history)
   - Useful for preventing accidental logout

### Route Structure
```
Public Routes:
├── /login → LoginPage
├── /signup → SignUpPage
├── /verify-email → VerificationPage
├── /signup-success → RegistrationSuccessPage
├── /company-list → CompanyList
├── /create-company → CreateCompanyPage
└── /edit-company/:companyId → UpdateCompanyPage

Protected Routes:
└── /* → AppLayout (if authenticated)
    └── Redirects to /login if not authenticated
```

---

## 3. Authentication Flow

### Login Process (`src/pages/auth/LoginPage.jsx`)

#### Step 1: Input Detection
```javascript
determineLoginType(input) {
  - Checks if input matches email regex → "email"
  - Checks if input matches phone regex → "phone"
  - Otherwise → "username"
  - Icon changes dynamically based on detected type
}
```

#### Step 2: Validation
- **Username**: Must not be empty
- **Email**: Validated using `validateEmail()` utility
- **Phone**: Validated using `validatePhone()` utility
- **Password**: Must not be empty

#### Step 3: API Call
```javascript
credentials = {
  uname: loginInput,        // if username
  email: loginInput,        // if email
  phone: loginInput,        // if phone
  pwd: password,
  loginType: "username|email|phone"
}

POST /pharmacy/auth/signin → response.data.accessToken
```

#### Step 4: State Management
```javascript
dispatch(setUser({
  user: {
    id, role, module, username, email, phone,
    userCompanies: [],
    currentCompany: null
  },
  token: accessToken
}))

localStorage.setItem("token", accessToken)
localStorage.setItem("user", JSON.stringify(user))
```

#### Step 5: Navigation Logic
```
if (userCompanies.length === 0)
  → Navigate to /create-company
else if (no primary company)
  → Navigate to /company-list
else
  → Navigate to /dashboard
```

#### Step 6: Auto-Redirect (useEffect)
```javascript
if (user && user.id) {
  if (currentCompany)
    → Navigate to /dashboard
  else
    → Navigate to /company-list
}
```

---

## 4. Redux State Management

### User Slice (`src/services/userSlice.js`)

**Initial State:**
```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  userCompanies: [],
  currentCompany: null,
  loading: false,
  error: null
}
```

**Key Actions:**
- `setUser()` - Sets user, token, and marks as authenticated
- `updateUserCompanies()` - Updates user's company list
- `setCurrentCompany()` - Sets active company
- `logout()` - Clears all user data and localStorage
- `updateUser()` - Updates user properties
- `setLoading()` / `setError()` - Manages loading/error states

---

## 5. API Integration

### Auth API (`src/services/authApi.js`)

**Base Query Setup:**
```javascript
baseUrl: /pharmacy/auth
Headers:
  - Content-Type: application/json
  - Authorization: Bearer {token}
```

**Endpoints:**
- `POST /signin` - Login
- `POST /signup` - Register
- `POST /send-otp` - Send OTP
- `POST /verify-otp` - Verify OTP
- `POST /verify-email` - Verify email
- `POST /resend-verification` - Resend verification
- `POST /switch-company` - Switch company
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `POST /change-password` - Change password
- `POST /refresh` - Refresh token
- `POST /logout` - Logout

**Token Expiration Handling:**
```javascript
if (401 error && TOKEN_EXPIRED)
  → dispatch(logout())
  → redirect to /
```

---

## 6. Protected Routes Flow

### Route Protection (`src/routes/ProtectedRoute.jsx`)

```javascript
ProtectedRoute checks:
1. User role from Redux
2. Required module permission
3. Required action (V=View, C=Create, E=Edit)

if (!hasPermission)
  → Navigate to /unauthorized
else
  → Render component
```

### Route Configuration (`src/routes/routeConfig.jsx`)

Each route has:
```javascript
{
  path: "/master/inventory/items",
  module: "inventory",      // Permission module
  action: "V",              // V=View, C=Create, E=Edit
  element: <ItemsPage />
}
```

---

## 7. Main Application Layout

### AppLayout (`src/componets/layout/AppLayout.jsx`)

```
AppLayout
├── Sidebar (Navigation menu)
├── Header (Top bar with user info)
└── AppRoutes (Protected routes)
    └── Renders components based on routeConfig
```

**Features:**
- Responsive sidebar (collapses on desktop, drawer on mobile)
- Dynamic menu based on user permissions
- Header with user profile and logout

---

## 8. Data Flow Diagram

```
User Input (LoginPage)
    ↓
Input Validation
    ↓
API Call (authApi.signin)
    ↓
Response Processing
    ↓
Redux State Update (setUser)
    ↓
localStorage Update
    ↓
Navigation Decision
    ├── No companies → /create-company
    ├── No primary → /company-list
    └── Has primary → /dashboard
    ↓
AppLayout Renders
    ↓
Protected Routes Check Permissions
    ↓
Component Renders
```

---

## 9. Issues Found & Fixed

### ✅ Fixed Issues:

1. **Unused Import**: `Select` component was imported but never used
2. **Unused State Variables**: 
   - `selectedRole` - never used
   - `isSuccess`, `isError` - never used
3. **Unused Error State**: `error` state was set but never displayed (using `showToast` instead)
4. **Unused console.log**: `console.log(loginType)` removed

### ⚠️ Potential Issues to Monitor:

1. **Token Refresh**: No automatic token refresh mechanism visible. If token expires, user is logged out completely.
   - **Recommendation**: Implement token refresh before expiration

2. **Company Selection**: The flow assumes `currentCompany` is set, but it's only set when user navigates to company-list
   - **Recommendation**: Ensure `setCurrentCompany` is called after company selection

3. **Error State Not Used**: The `error` state in LoginPage is set but never displayed
   - **Current**: Using `showToast` for errors (better UX)
   - **Status**: ✅ Correct approach

4. **Commented Code**: Large commented block in LoginPage (demo credentials)
   - **Recommendation**: Remove or move to documentation

5. **Redux Persist**: Only persists `user` slice
   - **Recommendation**: Verify if other slices need persistence

---

## 10. Complete User Journey

### First Time User
```
1. Visit /login
2. Enter credentials (username/email/phone + password)
3. API validates and returns user + companies
4. Redux state updated
5. Check company status:
   - No companies → Redirect to /create-company
   - Has companies but no primary → Redirect to /company-list
   - Has primary company → Redirect to /dashboard
6. User creates/selects company
7. Dashboard loads with sidebar and protected routes
```

### Returning User
```
1. Visit /login
2. Redux Persist restores user from localStorage
3. useEffect detects user exists
4. Auto-redirects to /dashboard or /company-list
5. User never sees login page
```

### Token Expiration
```
1. User makes API call
2. Backend returns 401 with TOKEN_EXPIRED
3. authApi middleware catches error
4. dispatch(logout()) clears Redux state
5. localStorage cleared
6. Redirect to /login
7. User must login again
```

---

## 11. Redux Store Configuration

**Configured APIs:**
- authApi, userApi, billApi, companyApi, storeApi, itemApi, hsnApi, rackApi, saltApi, unitApi, mfrApi, patientApi, prescriptionApi, doctorApi, groupApi, ledgerApi, transactionApi, salesBillApi, ledgerEntryApi, saleMasterApi, purchaseMasterApi, stationApi, userCompanyApi

**Middleware:**
- Redux Thunk (default)
- All API middleware for RTK Query

**Persistence:**
- Only `user` slice persisted to localStorage
- Whitelist: ['user']

---

## 12. Summary

The application follows a clean architecture with:
- ✅ Proper authentication flow
- ✅ Redux state management
- ✅ Protected routes with permission checking
- ✅ Responsive UI with sidebar and header
- ✅ Token-based API authentication
- ✅ Automatic state restoration on page refresh

**Code Quality**: Good - minimal unused code, proper error handling, clear separation of concerns.

