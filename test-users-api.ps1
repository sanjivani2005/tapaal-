# PowerShell script to test Users API
Write-Host "🔍 Testing Users API..." -ForegroundColor Green

# Test 1: Get all users
Write-Host "`n--- Test 1: GET /api/users ---" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users" -Method GET
    Write-Host "✅ GET Response:" $response.Content -ForegroundColor Green
} catch {
    Write-Host "❌ GET Error:" $_.Exception.Message -ForegroundColor Red
}

# Test 2: Create new user
Write-Host "`n--- Test 2: POST /api/users ---" -ForegroundColor Yellow
$userData = @{
    username = "testuser"
    email = "test@company.com"
    fullName = "Test User"
    role = "user"
    department = "Finance"
    position = "Finance Executive"
    password = "password123"
    employeeId = "emp-001"
    phone = "+918484815642"
    address = "123 Test Street"
    country = "India"
    zipCode = "441108"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users" -Method POST -Body $userData -ContentType "application/json"
    Write-Host "✅ POST Response:" $response.Content -ForegroundColor Green
} catch {
    Write-Host "❌ POST Error:" $_.Exception.Message -ForegroundColor Red
}

# Test 3: Update user (need to replace with actual user ID)
Write-Host "`n--- Test 3: PUT /api/users/:id ---" -ForegroundColor Yellow
$updateData = @{
    fullName = "Updated Test User"
    role = "manager"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users/actualUserId" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "✅ PUT Response:" $response.Content -ForegroundColor Green
} catch {
    Write-Host "❌ PUT Error:" $_.Exception.Message -ForegroundColor Red
}

# Test 4: Delete user (need to replace with actual user ID)
Write-Host "`n--- Test 4: DELETE /api/users/:id ---" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users/actualUserId" -Method DELETE
    Write-Host "✅ DELETE Response:" $response.Content -ForegroundColor Green
} catch {
    Write-Host "❌ DELETE Error:" $_.Exception.Message -ForegroundColor Red
}

Write-Host "`n🎉 Users API testing completed!" -ForegroundColor Green
