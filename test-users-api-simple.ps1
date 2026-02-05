# Simple PowerShell script to test Users API
Write-Host "Testing Users API..." -ForegroundColor Green

# Test 1: Get all users
Write-Host "Test 1: GET /api/users" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users" -Method GET
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Create new user
Write-Host "Test 2: POST /api/users" -ForegroundColor Yellow
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
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users" -Method POST -Body $userData -ContentType "application/json"
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Update user
Write-Host "Test 3: PUT /api/users/testuser" -ForegroundColor Yellow
$updateData = @{
    fullName = "Updated Test User"
    role = "manager"
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users/testuser" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Delete user
Write-Host "Test 4: DELETE /api/users/testuser" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/users/testuser" -Method DELETE
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Testing completed!" -ForegroundColor Green
