# kearl

A modern, developer-friendly HTTP client - an improved version of `curl`.

## Features

### ✅ **Core HTTP Functionality**

- GET and POST requests with full header support
- Automatic content-type detection
- File upload support (`@filename`)
- Timeout and redirect control
- Custom User-Agent
- **Dry-run mode** - Preview requests before sending

### ✅ **Pretty Output & Syntax Highlighting**

- JSON pretty printing with syntax highlighting
- **Inline jq filtering** - Extract data with jq-style queries
- YAML and XML support
- Color-coded HTTP status codes
- Verbose mode with headers and timing

### ✅ **Interactive JSON Explorer** 🌟

- Vim-like navigation through JSON responses
- Expand/collapse nested objects and arrays
- Search functionality
- Real-time JSON exploration

### ✅ **Profile System**

- Multiple configuration profiles
- Base URLs and default headers
- Template variables with `{{variable}}` syntax
- Environment variable support `{{env.VAR}}`

### ✅ **Request History & Comparison**

- Automatic request/response history storage
- List recent requests with timing
- Detailed request inspection
- Side-by-side request comparison

### ✅ **Shell Completion** 🚀

- Dynamic command and flag completion
- Auto-complete profile, palette, and history IDs
- Support for bash, zsh, fish, and PowerShell
- Smart context-aware suggestions

### ✅ **GraphQL Support** 🔥

- Full query and mutation support
- Variables and operation names
- Schema introspection
- Integrated with all kearl features (filtering, assertions, history, profiles)

### ✅ **Response Caching** ⚡

- Intelligent response caching with TTL
- Configurable cache duration
- Cache refresh and invalidation
- Cache statistics and management
- Automatic expired entry cleanup

### ✅ **Auto-Retry with Backoff** 🔄

- Automatic retry on failure with exponential backoff
- Configurable retry attempts (max: 5)
- Smart retry on 5xx errors, 429, 408
- Respects Retry-After headers
- Customizable delays and retry conditions

### ✅ **Command Piping** 🔗

- Chain commands together using Unix pipes
- Filter output from one request and pipe to another
- Automatic stdin detection for POST requests
- No need to repeat filters - transform once, use anywhere

## Installation

### Method 1: Using `go install` (Recommended)

```bash
# Clone and install
git clone https://github.com/ckearl/kearl.git
cd kearl
-
# Make sure GOPATH/bin is in your PATH
echo 'export PATH="$PATH:$(go env GOPATH)/bin"' >> ~/.zshrc
source ~/.zshrc
```

### Method 2: Using Make

```bash
git clone https://github.com/ckearl/kearl.git
cd kearl
make install
```

### Method 3: Manual Build

<!-- UPDATE github username -->
```bash
git clone https://github.com/ckearl/kearl.git
cd kearl
go build -o kearl
sudo mv kearl /usr/local/bin/
```

### Verify Installation

```bash
kearl --version
# Should output: kearl version 0.1.0
```

## Quick Start

```bash
# Basic GET request
kearl get https://api.github.com/user
# POST with JSON data
kearl post https://httpbin.org/post -d '{"name": "John"}'
# Interactive JSON explorer
kearl get https://api.github.com/user --interactive
# Using profiles
kearl profile create api --base-url https://api.example.com --timeout 60
kearl get /users --profile api
# GraphQL query
kearl graphql https://spacex-production.up.railway.app/ -g '{ company { name ceo } }'
# View request history
kearl history list
kearl history show 1
kearl history diff 1 2
```

## Examples

### Inline jq Filtering

```bash
# Extract specific field from JSON response
kearl get https://api.github.com/repos/golang/go -f '.name'
# Output: go
# Create custom object from response
kearl get https://api.github.com/repos/golang/go -f '{name, stars: .stargazers_count, language}'
# Output: {"language":"Go","name":"go","stars":130354}
# Filter arrays
kearl get https://jsonplaceholder.typicode.com/users -f '.[0:3] | .[] | {name, email}'
# Output: First 3 users with only name and email fields
```

### Dry-Run Mode

```bash
# Preview what will be sent without actually sending
kearl get https://api.example.com/data --dry-run -H "Authorization: Bearer token"
# Shows: Method, URL, Headers, Body, Profile settings, Filter (if any)
# Test complex requests before execution
kearl post https://api.example.com/users --dry-run \
 -d '{"name":"John","email":"john@example.com"}' \
 -f '.id'
```

### Template Variables

```bash
# Set up profile with variables
kearl profile create dev --base-url https://dev-api.com
# Use in requests
kearl get "/users/{{env.USER_ID}}" --profile dev
```

### Profile Management

```bash
# List all profiles
kearl profile list
# Create new profile
kearl profile create prod \
 --base-url https://api.prod.com \
 --header "Authorization: Bearer {{env.API_TOKEN}}" \
 --variable "api_version=v1" \
 --timeout 30
# Update existing profile (only specified fields are changed)
kearl profile update prod \
 --description "Production API profile" \
 --timeout 60 \
 --interactive
# Update headers and variables
kearl profile update prod \
 -H "Authorization: Bearer {{env.NEW_TOKEN}}" \
 -H "X-Environment: production" \
 -V "api_version=v2" \
 -V "region=us-west-2"
# Use profile
kearl get /health --profile prod
```

### Response Diffing

```bash
# Compare two API endpoints
kearl diff https://api.example.com/v1/users https://api.example.com/v2/users
# Compare current response with history
kearl diff https://api.example.com/users --compare-with history:5
# Apply filters before comparing
kearl diff https://api.example.com/users https://api.staging.com/users -f '.data'
# Compact mode (summary only)
kearl diff https://api.example.com/users https://api.example.com/users --compact
# Use exit code for CI/CD
kearl diff url1 url2 --exit-code  # Exit 1 if differences found
```

### Response Assertions

```bash
# Single assertion
kearl get https://jsonplaceholder.typicode.com/todos/1 -a '.userId == 1'
# Multiple assertions with names
kearl get https://jsonplaceholder.typicode.com/todos/1 \
 -a 'user_valid: .userId == 1' \
 -a 'id_check: .id > 0' \
 -a 'title_exists: .title | length > 0'
# Combine with filtering
kearl post https://httpbin.org/post -d '{"name":"test"}' \
 -f '.json' \
 -a '.name == "test"'
# Use in CI/CD pipelines (exits with error if assertions fail)
kearl get https://api.example.com/health -a 'status_ok: .status == "healthy"'
```

### History & Comparison

```bash
# View recent requests
kearl history list
# Compare two requests
kearl history diff 5 6
# Clear history
kearl history clear
```

### GraphQL Queries

```bash
# Simple query
kearl graphql https://spacex-production.up.railway.app/ \
 -g '{ company { name ceo founded } }'
# Query with filtering
kearl graphql https://spacex-production.up.railway.app/ \
 -g '{ launches(limit: 10) { mission_name launch_date_local } }' \
 -f '.data.launches[0]'
# Query with assertions
kearl graphql https://spacex-production.up.railway.app/ \
 -g '{ company { name ceo } }' \
 -a 'has_company: .data.company.name'
# Query from file
kearl graphql https://api.github.com/graphql \
 -g @query.graphql \
 -H "Authorization: Bearer $GITHUB_TOKEN"
# Query with variables
kearl graphql https://api.github.com/graphql \
 -g 'query($owner: String!, $name: String!) { repository(owner: $owner, name: $name) { stargazerCount } }' \
 --variables '{"owner": "golang", "name": "go"}' \
 -H "Authorization: Bearer $GITHUB_TOKEN"
# Schema introspection
kearl graphql https://spacex-production.up.railway.app/ --introspect
# Interactive JSON explorer
kearl graphql https://spacex-production.up.railway.app/ \
 -g '{ launches(limit: 100) { mission_name launch_year } }' \
 -i
# Dry-run mode
kearl graphql https://api.github.com/graphql \
 -g '{ viewer { login } }' \
 -H "Authorization: Bearer $GITHUB_TOKEN" \
 --dry-run
```

### Auto-Retry with Backoff

```bash
# Enable retry with defaults (3 attempts, 1s initial delay)
kearl get https://api.unreliable-service.com/data --retry
# Custom retry configuration
kearl get https://api.example.com/data --retry --retry-max 5 --retry-delay 2000
# Retry automatically backs off exponentially:
# Attempt 1: fails -> wait 1s
# Attempt 2: fails -> wait 2s
# Attempt 3: fails -> wait 4s
# Attempt 4: fails -> wait 8s
# Attempt 5: success!
# Combine with other features
kearl get https://api.example.com/data --retry --cache --assert 'status_ok: .status == "ok"'
# Retry status is shown in real-time
# [Retry 1/3] Status 503 - waiting 1s before retry...
# [Retry 2/3] Status 503 - waiting 2s before retry...
# [Retry 3/3] Status 503 - waiting 4s before retry...
```

### Command Piping

```bash
# Pipe filtered output to another request
kearl get https://jsonplaceholder.typicode.com/todos/1 -f '.title' -q | \
 kearl post https://httpbin.org/post
# Transform data from one API and send to another
kearl get https://jsonplaceholder.typicode.com/users/1 \
 -f '{name, email, company: .company.name}' -q | \
 kearl post https://api.example.com/users
# Extract array elements and pipe
kearl get https://api.example.com/data -f '.items[0]' -q | \
 kearl post https://api.example.com/process
# Combine with filters on both sides
kearl get https://api.example.com/source -f '.data' -q | \
 kearl post https://api.example.com/destination -f '.result'
# Chain multiple transformations
kearl get https://api.github.com/repos/golang/go -f '{name, stars: .stargazers_count}' -q | \
 kearl post https://httpbin.org/post -f '.json'
# The -q (quiet) flag is key - it outputs only the filtered data without formatting
# This makes it perfect for piping between commands
```

### Response Caching

```bash
# Enable caching (default TTL: 5 minutes)
kearl get https://api.example.com/data --cache
# Cache with custom TTL (in seconds)
kearl get https://api.example.com/data --cache --cache-ttl 3600  # 1 hour
# Force refresh (bypass cache)
kearl get https://api.example.com/data --cache --cache-refresh
# List cached responses
kearl cache list
# View cache statistics
kearl cache stats
# Clear all cache
kearl cache clear
# Remove expired entries
kearl cache clean
# Delete specific cache entry
kearl cache delete [key]
# Example workflow: Cache expensive API calls
kearl get https://api.slow-service.com/heavy-data --cache --cache-ttl 7200
# Subsequent requests within 2 hours are instant!
kearl get https://api.slow-service.com/heavy-data --cache
# [Cache Hit] Serving from cache (age: 30s)
```

### Shell Completion

```bash
# Generate completion script for your shell
kearl completion bash   # For bash
kearl completion zsh    # For zsh
kearl completion fish   # For fish
kearl completion powershell  # For PowerShell
# Install completions for current session
source <(kearl completion bash)   # bash
source <(kearl completion zsh)    # zsh
kearl completion fish | source    # fish
# Install completions permanently
# Bash (Linux)
kearl completion bash > /etc/bash_completion.d/kearl
# Bash (macOS with Homebrew)
kearl completion bash > $(brew --prefix)/etc/bash_completion.d/kearl
# Zsh
kearl completion zsh > "${fpath[1]}/_kearl"
# Fish
kearl completion fish > ~/.config/fish/completions/kearl.fish
# PowerShell (add to profile)
kearl completion powershell > kearl.ps1
# Then source from your PowerShell profile
```

**Smart completions include:**

- Profile names when using `--profile` flag or `kearl profile` commands
- Palette names for `--palette` flag and `kearl palette` commands
- Recent history IDs with method/URL descriptions for `kearl history` and `kearl diff --compare-with`

## Configuration

kearl stores configuration in `~/.config/kearl/`:

- `config.yaml` - Profiles and settings
- `history.db` - Request history database
- `cache.db` - Response cache database

- `palettes.json` - Color palettes

## Commands

- `kearl get [URL]` - Send GET request
- `kearl post [URL]` - Send POST request
- `kearl profile` - Manage profiles
  - `kearl profile list` - List all profiles
  - `kearl profile show [name]` - Show profile details
  - `kearl profile create [name]` - Create new profile
  - `kearl profile update [name]` - Update existing profile
  - `kearl profile delete [name]` - Delete profile
- `kearl history` - View and compare request history
- `kearl diff [URL1] [URL2]` - Compare API responses
- `kearl graphql [URL]` - Send GraphQL queries and mutations
- `kearl cache` - Manage response cache
  - `kearl cache list` - List cached responses
  - `kearl cache stats` - Show cache statistics
  - `kearl cache clear` - Clear all cache
  - `kearl cache clean` - Remove expired entries
  - `kearl cache delete [key]` - Delete specific entry
- `kearl completion [shell]` - Generate shell completion script

## Flags

- `-i, --interactive` - Open interactive JSON explorer
- `-f, --filter` - Apply jq filter to JSON response (e.g., `.data[0].name`)
- `-a, --assert` - Add assertion to validate response (e.g., `status_ok: .id == 1`)
- `-H, --header` - Add HTTP headers
- `-d, --data` - Request body data
- `-v, --verbose` - Show headers and timing
- `-q, --quiet` - Only show response body
- `--profile` - Use specific profile
- `--dry-run` - Preview request without sending it
- `--cache` - Enable response caching
- `--cache-ttl` - Cache TTL in seconds (default: 300)
- `--cache-refresh` - Force refresh cache
- `--retry` - Enable automatic retry on failure
- `--retry-max` - Maximum retry attempts (default: 3, max: 5)
- `--retry-delay` - Initial retry delay in milliseconds (default: 1000)

## What Makes kearl Special?

1. **Interactive JSON Explorer** - Navigate large JSON responses like a pro
2. **GraphQL Support** - First-class GraphQL client with full feature integration
3. **Auto-Retry with Backoff** - Resilient requests with exponential backoff
4. **Response Caching** - Speed up development with intelligent caching
5. **Command Piping** - Chain requests together Unix-style for powerful workflows
6. **Inline jq Filtering** - Extract and transform JSON data on the fly
7. **Response Diffing** - Compare API responses visually with color-coded output
8. **Response Assertions** - Validate API responses with jq-style expressions
9. **Dry-Run Mode** - Preview requests before sending them
10. **Smart Profiles** - Environment-specific configurations with templating
11. **Request History** - Never lose track of your API calls
12. **Shell Completion** - Tab-complete commands, profiles, palettes, and history
13. **Beautiful Output** - Syntax highlighting and smart formatting
14. **Developer Experience** - Built by developers, for developers

---

**kearl v0.1.0** - Built with ❤️ in Go
