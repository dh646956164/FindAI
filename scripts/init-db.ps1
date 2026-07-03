$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root

if (-not (Test-Path -LiteralPath ".env")) {
  Copy-Item -LiteralPath ".env.example" -Destination ".env"
  Write-Host "Created .env from .env.example. Change ADMIN_PASSWORD and AUTH_SECRET before deployment."
}

$docker = Get-Command docker -ErrorAction SilentlyContinue
if ($null -ne $docker) {
  docker compose up -d postgres
  Write-Host "Waiting for PostgreSQL..."
  $ready = $false
  for ($i = 0; $i -lt 30; $i++) {
    docker compose exec -T postgres pg_isready -U postgres -d ai_intel *> $null
    if ($LASTEXITCODE -eq 0) { $ready = $true; break }
    Start-Sleep -Seconds 1
  }
  if (-not $ready) { throw "PostgreSQL did not become ready in time." }
} else {
  Write-Host "Docker was not found. Using DATABASE_URL from .env."
}

npm run db:generate
npm run db:push
npm run db:seed
Write-Host "Database initialization completed."
