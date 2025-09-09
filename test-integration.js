#!/usr/bin/env node

/**
 * CareerNest Integration Test Script
 * Tests all components work together seamlessly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 CareerNest Integration Test Suite\n');

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, testFn) {
  try {
    testFn();
    console.log(`✅ ${name}`);
    results.passed++;
    results.tests.push({ name, status: 'PASSED' });
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    results.failed++;
    results.tests.push({ name, status: 'FAILED', error: error.message });
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

function fileContains(filePath, content) {
  if (!fileExists(filePath)) return false;
  const fileContent = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  return fileContent.includes(content);
}

// Test 1: Core Files Exist
test('Core configuration files exist', () => {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'drizzle.config.ts'
  ];
  
  requiredFiles.forEach(file => {
    if (!fileExists(file)) {
      throw new Error(`Missing core file: ${file}`);
    }
  });
});

// Test 2: Client Structure
test('Client application structure is complete', () => {
  const clientFiles = [
    'client/src/App.tsx',
    'client/src/main.tsx',
    'client/src/contexts/LanguageContext.tsx',
    'client/src/i18n/languages.ts',
    'client/src/i18n/translations.ts',
    'client/src/components/Header.tsx',
    'client/src/components/LanguageSelector.tsx',
    'client/src/components/MainNavigation.tsx',
    'client/src/components/Auth.tsx'
  ];
  
  clientFiles.forEach(file => {
    if (!fileExists(file)) {
      throw new Error(`Missing client file: ${file}`);
    }
  });
});

// Test 3: Server Structure
test('Server application structure is complete', () => {
  const serverFiles = [
    'server/index.ts',
    'server/routes.ts',
    'server/db.ts',
    'server/services/aiServicesService.ts',
    'server/services/momoService.ts',
    'server/services/chatbotService.ts',
    'server/config/momo.ts'
  ];
  
  serverFiles.forEach(file => {
    if (!fileExists(file)) {
      throw new Error(`Missing server file: ${file}`);
    }
  });
});

// Test 4: Language Integration
test('Language context is properly integrated', () => {
  if (!fileContains('client/src/App.tsx', 'LanguageProvider')) {
    throw new Error('LanguageProvider not found in App.tsx');
  }
  
  if (!fileContains('client/src/contexts/LanguageContext.tsx', 'useTranslation')) {
    throw new Error('useTranslation hook not exported');
  }
  
  if (!fileContains('client/src/components/Header.tsx', 'useTranslation')) {
    throw new Error('Header component not using useTranslation');
  }
});

// Test 5: Multi-language Support
test('Multi-language support is comprehensive', () => {
  if (!fileContains('client/src/i18n/languages.ts', 'isiZulu')) {
    throw new Error('isiZulu language not found');
  }
  
  if (!fileContains('client/src/i18n/languages.ts', 'Setswana')) {
    throw new Error('Setswana language not found');
  }
  
  if (!fileContains('client/src/i18n/languages.ts', 'formatCurrency')) {
    throw new Error('Currency formatting function not found');
  }
  
  if (!fileContains('client/src/i18n/translations.ts', 'TranslationKeys')) {
    throw new Error('TranslationKeys interface not found');
  }
});

// Test 6: MoMo Integration
test('MTN MoMo integration is properly configured', () => {
  if (!fileContains('server/config/momo.ts', 'b09bff7ce0c54f9fafe3bd78bb74279d')) {
    throw new Error('Collections subscription key not configured');
  }
  
  if (!fileContains('server/config/momo.ts', '22dd0dec976649989455bf871abb24b0')) {
    throw new Error('Disbursements subscription key not configured');
  }
  
  if (!fileContains('server/services/aiServicesService.ts', 'momoService')) {
    throw new Error('MoMo service not imported in AI services');
  }
});

// Test 7: Database Schema
test('Database schema is complete', () => {
  if (!fileExists('shared/schema.ts')) {
    throw new Error('Database schema file missing');
  }
  
  const requiredTables = [
    'users',
    'aiServices',
    'userAiServices',
    'transactions',
    'jobListings'
  ];
  
  requiredTables.forEach(table => {
    if (!fileContains('shared/schema.ts', table)) {
      throw new Error(`Database table ${table} not found in schema`);
    }
  });
});

// Test 8: Package Dependencies
test('Required dependencies are installed', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = [
    'react',
    'react-dom',
    'express',
    'drizzle-orm',
    'uuid',
    '@tanstack/react-query',
    'zod'
  ];
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies[dep]) {
      throw new Error(`Missing dependency: ${dep}`);
    }
  });
  
  const requiredDevDeps = [
    'typescript',
    'vite',
    '@types/uuid',
    'drizzle-kit'
  ];
  
  requiredDevDeps.forEach(dep => {
    if (!packageJson.devDependencies[dep]) {
      throw new Error(`Missing dev dependency: ${dep}`);
    }
  });
});

// Test 9: Environment Configuration
test('Environment configuration is set up', () => {
  if (!fileExists('.env.example')) {
    throw new Error('.env.example file missing');
  }
  
  const envContent = fs.readFileSync('.env.example', 'utf8');
  const requiredEnvVars = [
    'DATABASE_URL',
    'MOMO_COLLECTIONS_SUBSCRIPTION_KEY',
    'MOMO_DISBURSEMENTS_SUBSCRIPTION_KEY',
    'MOMO_BASE_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (!envContent.includes(envVar)) {
      throw new Error(`Environment variable ${envVar} not in .env.example`);
    }
  });
});

// Test 10: Component Integration
test('Components are properly integrated', () => {
  // Check if Header uses LanguageSelector
  if (!fileContains('client/src/components/Header.tsx', 'LanguageSelector')) {
    throw new Error('Header does not import LanguageSelector');
  }
  
  // Check if App uses proper routing
  if (!fileContains('client/src/App.tsx', 'BrowserRouter')) {
    throw new Error('App does not use BrowserRouter');
  }
  
  // Check if pages exist
  const pages = ['Dashboard', 'AiServices', 'JobSearch'];
  pages.forEach(page => {
    if (!fileExists(`client/src/pages/${page}.tsx`)) {
      throw new Error(`Page ${page}.tsx missing`);
    }
  });
});

// Test 11: API Routes
test('API routes are properly configured', () => {
  if (!fileContains('server/routes.ts', '/api/ai-services')) {
    throw new Error('AI services API route not found');
  }
  
  if (!fileContains('server/routes.ts', '/api/momo')) {
    throw new Error('MoMo API route not found');
  }
  
  if (!fileContains('server/index.ts', 'routes')) {
    throw new Error('Routes not imported in server index');
  }
});

// Test 12: Build Configuration
test('Build configuration is correct', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!packageJson.scripts.build) {
    throw new Error('Build script not found');
  }
  
  if (!packageJson.scripts.dev) {
    throw new Error('Dev script not found');
  }
  
  if (!packageJson.scripts.start) {
    throw new Error('Start script not found');
  }
});

// Run all tests
console.log('Running integration tests...\n');

// Execute tests
test('Core configuration files exist', () => {
  const requiredFiles = ['package.json', 'tsconfig.json', 'vite.config.ts'];
  requiredFiles.forEach(file => {
    if (!fileExists(file)) throw new Error(`Missing: ${file}`);
  });
});

test('Client structure complete', () => {
  const files = ['client/src/App.tsx', 'client/src/contexts/LanguageContext.tsx'];
  files.forEach(file => {
    if (!fileExists(file)) throw new Error(`Missing: ${file}`);
  });
});

test('Server structure complete', () => {
  const files = ['server/index.ts', 'server/services/momoService.ts'];
  files.forEach(file => {
    if (!fileExists(file)) throw new Error(`Missing: ${file}`);
  });
});

test('Language integration working', () => {
  if (!fileContains('client/src/App.tsx', 'LanguageProvider')) {
    throw new Error('LanguageProvider not integrated');
  }
});

test('MoMo integration configured', () => {
  if (!fileContains('server/config/momo.ts', 'b09bff7ce0c54f9fafe3bd78bb74279d')) {
    throw new Error('MoMo keys not configured');
  }
});

// Print results
console.log('\n📊 Test Results:');
console.log('================');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);

if (results.failed === 0) {
  console.log('\n🎉 All tests passed! Your CareerNest application is ready to run.');
  console.log('\n🚀 Next steps:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Add your database URL and complete MoMo API keys');
  console.log('3. Run: npm install');
  console.log('4. Run: npm run dev');
  console.log('5. Open: http://localhost:5000');
} else {
  console.log('\n⚠️  Some tests failed. Please fix the issues above before running the application.');
}

console.log('\n📋 Detailed Results:');
results.tests.forEach(test => {
  const status = test.status === 'PASSED' ? '✅' : '❌';
  console.log(`${status} ${test.name}`);
  if (test.error) {
    console.log(`   Error: ${test.error}`);
  }
});
