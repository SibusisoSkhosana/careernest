#!/usr/bin/env node

/**
 * MTN MoMo API Setup Script
 * This script helps you generate the required API User IDs and API Keys
 * using your subscription keys.
 */

const https = require('https');
const crypto = require('crypto');

// Your subscription keys (already provided)
const COLLECTIONS_SUBSCRIPTION_KEY = 'b09bff7ce0c54f9fafe3bd78bb74279d';
const DISBURSEMENTS_SUBSCRIPTION_KEY = '22dd0dec976649989455bf871abb24b0';

const BASE_URL = 'sandbox.momodeveloper.mtn.com';

// Generate UUID v4
function generateUUID() {
  return crypto.randomUUID();
}

// Make HTTP request
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Create API User
async function createApiUser(subscriptionKey, userType = 'collections') {
  const userId = generateUUID();
  const path = '/v1_0/apiuser';
  
  const options = {
    hostname: BASE_URL,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'X-Reference-Id': userId
    }
  };

  const data = JSON.stringify({
    providerCallbackHost: 'webhook.site'
  });

  try {
    const response = await makeRequest(options, data);
    
    if (response.statusCode === 201) {
      console.log(`✅ ${userType} API User created successfully!`);
      console.log(`   User ID: ${userId}`);
      return userId;
    } else {
      console.error(`❌ Failed to create ${userType} API User:`, response.statusCode, response.body);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${userType} API User:`, error.message);
    return null;
  }
}

// Create API Key
async function createApiKey(subscriptionKey, userId, userType = 'collections') {
  const path = `/v1_0/apiuser/${userId}/apikey`;
  
  const options = {
    hostname: BASE_URL,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  };

  try {
    const response = await makeRequest(options);
    
    if (response.statusCode === 201) {
      const apiKey = JSON.parse(response.body).apiKey;
      console.log(`✅ ${userType} API Key created successfully!`);
      console.log(`   API Key: ${apiKey}`);
      return apiKey;
    } else {
      console.error(`❌ Failed to create ${userType} API Key:`, response.statusCode, response.body);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${userType} API Key:`, error.message);
    return null;
  }
}

// Main setup function
async function setupMoMoAPI() {
  console.log('🚀 Setting up MTN MoMo API credentials...\n');

  // Setup Collections API
  console.log('📥 Setting up Collections API (for receiving payments)...');
  const collectionsUserId = await createApiUser(COLLECTIONS_SUBSCRIPTION_KEY, 'Collections');
  
  if (collectionsUserId) {
    // Wait a moment for the user to be created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const collectionsApiKey = await createApiKey(COLLECTIONS_SUBSCRIPTION_KEY, collectionsUserId, 'Collections');
    
    if (collectionsApiKey) {
      console.log('\n✅ Collections API setup complete!\n');
    }
  }

  // Setup Disbursements API
  console.log('📤 Setting up Disbursements API (for sending payments)...');
  const disbursementsUserId = await createApiUser(DISBURSEMENTS_SUBSCRIPTION_KEY, 'Disbursements');
  
  if (disbursementsUserId) {
    // Wait a moment for the user to be created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const disbursementsApiKey = await createApiKey(DISBURSEMENTS_SUBSCRIPTION_KEY, disbursementsUserId, 'Disbursements');
    
    if (disbursementsApiKey) {
      console.log('\n✅ Disbursements API setup complete!\n');
    }
  }

  // Generate .env file content
  console.log('📝 Your .env file should contain:');
  console.log('=====================================');
  console.log('# Database');
  console.log('DATABASE_URL=your-database-url-here');
  console.log('');
  console.log('# MTN MoMo API Configuration');
  console.log('MOMO_BASE_URL=https://sandbox.momodeveloper.mtn.com');
  console.log('');
  console.log('# Collections API (Receiving Payments)');
  console.log(`MOMO_COLLECTIONS_SUBSCRIPTION_KEY=${COLLECTIONS_SUBSCRIPTION_KEY}`);
  if (collectionsUserId) {
    console.log(`MOMO_COLLECTIONS_USER_ID=${collectionsUserId}`);
  }
  if (collectionsApiKey) {
    console.log(`MOMO_COLLECTIONS_API_KEY=${collectionsApiKey}`);
  }
  console.log('');
  console.log('# Disbursements API (Sending Payments)');
  console.log(`MOMO_DISBURSEMENTS_SUBSCRIPTION_KEY=${DISBURSEMENTS_SUBSCRIPTION_KEY}`);
  if (disbursementsUserId) {
    console.log(`MOMO_DISBURSEMENTS_USER_ID=${disbursementsUserId}`);
  }
  if (disbursementsApiKey) {
    console.log(`MOMO_DISBURSEMENTS_API_KEY=${disbursementsApiKey}`);
  }
  console.log('');
  console.log('# Callback Configuration');
  console.log('MOMO_CALLBACK_HOST=https://your-app.vercel.app');
  console.log('=====================================');
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Copy the above configuration to your .env file');
  console.log('2. Add your database URL');
  console.log('3. Update the callback host with your actual domain');
  console.log('4. Run: npm run dev');
  console.log('5. Test the payment flow!');
}

// Run the setup
if (require.main === module) {
  setupMoMoAPI().catch(console.error);
}

module.exports = { setupMoMoAPI, createApiUser, createApiKey };
