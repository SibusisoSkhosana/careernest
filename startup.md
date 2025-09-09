# CareerNest Startup Guide

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- MTN MoMo API credentials (for production)

### 1. Environment Setup
```bash
# Clone and navigate to project
cd her-pathfinder-hub-main

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API credentials
```

### 2. Database Setup
```bash
# Run database migrations
npm run db:migrate

# Initialize AI services and sample data
npm run init:services
```

### 3. Start Development Server
```bash
# Start the development server
npm run dev

# Server will be available at http://localhost:5000
```

## 🔧 Component Integration Verification

### Navigation Test
1. **Header Navigation**: Click through all navigation links
   - ✅ Career Assessment
   - ✅ CV Generator  
   - ✅ Cover Letter
   - ✅ AI Services
   - ✅ Job Search
   - ✅ Mentorship

2. **Mobile Navigation**: Test hamburger menu
   - ✅ Opens/closes properly
   - ✅ All categories visible
   - ✅ Quick actions work
   - ✅ MoMo payment info displayed

### AI Services Integration Test
1. **Service Discovery**
   ```
   Navigate to /ai-services
   ✅ All 3 services displayed (CV, Cover Letter, Job Alerts)
   ✅ Pricing shown in ZAR (R50, R50, R100)
   ✅ Feature lists visible
   ✅ Purchase buttons functional
   ```

2. **Payment Flow Test**
   ```
   Click "Pay with MoMo" button
   ✅ Phone number prompt appears
   ✅ Payment initiation message shown
   ✅ Status polling begins
   ✅ Service activation on success
   ```

3. **Service Usage Test**
   ```
   After purchase:
   ✅ Service appears in "My Services" tab
   ✅ Usage counter shows 0/1 or 0/30
   ✅ Expiration date displayed
   ✅ "Use Service" button enabled
   ```

### Content Generation Test
1. **CV Generator**
   ```
   Navigate to /cv-generator
   ✅ Multi-step form loads
   ✅ Progress indicators work
   ✅ Form validation active
   ✅ Template selection available
   ✅ Generation requires payment
   ```

2. **Cover Letter Generator**
   ```
   Navigate to /cover-letter
   ✅ Personal info form
   ✅ Job details form
   ✅ Background form
   ✅ AI generation process
   ✅ Download functionality
   ```

### Job Search Integration Test
1. **Job Search Interface**
   ```
   Navigate to /job-search
   ✅ Search filters functional
   ✅ Sample jobs displayed
   ✅ Job cards properly formatted
   ✅ Salary ranges in ZAR
   ✅ Application links work
   ```

2. **Job Alerts Subscription**
   ```
   Click "Get Job Alerts"
   ✅ Subscription modal opens
   ✅ R100/month pricing shown
   ✅ MoMo payment integration
   ✅ Subscription activation
   ```

### Chatbot Integration Test
1. **Chatbot Functionality**
   ```
   Click chatbot button (bottom right)
   ✅ Chat window opens
   ✅ Welcome message displays
   ✅ Quick reply buttons work
   ✅ MoMo questions answered
   ✅ Career guidance provided
   ```

2. **Service Integration**
   ```
   Ask about "AI services"
   ✅ Service information provided
   ✅ Quick replies for actions
   ✅ Redirect to /ai-services works
   ✅ Payment help available
   ```

## 📱 Accessibility Verification

### Keyboard Navigation
```bash
# Test keyboard-only navigation
Tab through entire application
✅ All interactive elements reachable
✅ Focus indicators visible
✅ Tab order logical
✅ Skip links functional
```

### Screen Reader Test
```bash
# Test with screen reader (if available)
✅ Proper heading structure
✅ Form labels present
✅ Button descriptions clear
✅ Status updates announced
```

### Mobile Responsiveness
```bash
# Test on mobile viewport
✅ Navigation menu works
✅ Forms are usable
✅ Touch targets adequate
✅ Content readable
```

## 🔄 Data Flow Verification

### User Journey Test
1. **New User Registration**
   ```
   ✅ User can register/login
   ✅ Dashboard loads with quick actions
   ✅ AI services accessible
   ✅ Payment flow works
   ✅ Services activate properly
   ```

2. **Service Usage Flow**
   ```
   ✅ Purchase AI service
   ✅ Generate content (CV/Cover Letter)
   ✅ Search and apply for jobs
   ✅ Subscribe to job alerts
   ✅ Use chatbot for assistance
   ```

### Database Integration
```sql
-- Verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'ai_services',
  'user_ai_services', 
  'generated_cvs',
  'generated_cover_letters',
  'job_listings',
  'job_alert_subscriptions',
  'transactions'
);
```

### API Integration
```bash
# Test API endpoints
curl -X GET http://localhost:5000/api/ai-services
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

## 🎯 Performance Verification

### Page Load Times
```
✅ Dashboard: < 2 seconds
✅ AI Services: < 2 seconds  
✅ Job Search: < 3 seconds
✅ CV Generator: < 2 seconds
✅ Cover Letter: < 2 seconds
```

### API Response Times
```
✅ Service listing: < 500ms
✅ Job search: < 1 second
✅ Chatbot response: < 2 seconds
✅ Payment initiation: < 1 second
```

## 🔒 Security Verification

### Authentication
```
✅ Protected routes require login
✅ JWT tokens properly validated
✅ Session management secure
✅ Logout functionality works
```

### Payment Security
```
✅ MoMo API credentials secure
✅ Transaction data encrypted
✅ Payment status verified
✅ Error handling robust
```

## 🐛 Common Issues & Solutions

### Database Connection Issues
```bash
# Check database connection
npm run db:check

# Reset database if needed
npm run db:reset
npm run db:migrate
npm run init:services
```

### Missing AI Services
```bash
# Reinitialize AI services
npm run init:services

# Or manually run initialization
node server/scripts/initAiServices.ts
```

### Payment Integration Issues
```bash
# Check MoMo API credentials in .env
MOMO_API_USER=your_api_user
MOMO_API_KEY=your_api_key
MOMO_SUBSCRIPTION_KEY=your_subscription_key

# Test MoMo connection
npm run test:momo
```

### Chatbot Not Responding
```bash
# Check chatbot service
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'

# Restart server if needed
npm run dev
```

## ✅ Final Integration Checklist

### Core Functionality
- [ ] User registration/login works
- [ ] Dashboard displays correctly
- [ ] Navigation is accessible
- [ ] AI services are purchasable
- [ ] Content generation works
- [ ] Job search functions properly
- [ ] Chatbot responds correctly

### Payment Integration
- [ ] MoMo payment flow complete
- [ ] Service activation automatic
- [ ] Transaction tracking works
- [ ] Error handling robust
- [ ] Status updates real-time

### User Experience
- [ ] Mobile responsive design
- [ ] Keyboard navigation works
- [ ] Loading states clear
- [ ] Error messages helpful
- [ ] Success confirmations visible

### Performance
- [ ] Page load times acceptable
- [ ] API responses fast
- [ ] Database queries optimized
- [ ] Images compressed
- [ ] Caching implemented

### Security
- [ ] Authentication secure
- [ ] API endpoints protected
- [ ] Data validation complete
- [ ] Error logging active
- [ ] Security headers set

## 🎉 Success Indicators

When all components are properly integrated:

1. **Seamless Navigation**: Users can easily move between all features
2. **Working Payments**: MoMo transactions complete successfully
3. **Content Generation**: AI services produce quality outputs
4. **Job Matching**: Search and alerts function properly
5. **Responsive Design**: Works across all devices
6. **Accessible Interface**: Usable by all users
7. **Performance**: Fast loading and responsive interactions
8. **Error Handling**: Graceful error recovery
9. **Help System**: Chatbot provides useful assistance
10. **Data Persistence**: User data and preferences saved

The platform is ready for production when all these integration points work seamlessly together!
