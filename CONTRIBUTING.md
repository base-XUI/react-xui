# Contributing to React-XUI

This document outlines our branching strategy, development workflow, and release process.

## Branching Strategy

We follow a modified GitFlow workflow:

- `main` - Production-ready code. Only merged from release branches or hotfixes.
- `development` - Main development branch. All feature branches merge here.
- `feature/*` - New features or enhancements (e.g., `feature/button-component`)
- `fix/*` - Bug fixes (e.g., `fix/button-focus-issue`)
- `release/*` - Release preparation branches (e.g., `release/1.0.0`)
- `hotfix/*` - Emergency fixes for production (e.g., `hotfix/critical-bug`)

## Development Workflow

1. **Start from development**:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   # or git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**: Write code, tests, and documentation

3. **Create a changeset** (for changes that should trigger a version change):

   ```bash
   pnpm changeset
   ```

   Follow the prompts to:

   - Select the package to be changed
   - Choose the appropriate semver change (patch/minor/major)
   - Write a detailed description of the changes

4. **Commit your changes** (following conventional commits):

   ```bash
   git add .
   git commit -m "feat: add new button variant"
   # or "fix:", "docs:", "chore:", "refactor:", etc.
   ```

5. **Push your branch and open a PR to development**:
   ```bash
   git push -u origin feature/your-feature-name
   ```
   - Create a PR targeting the `development` branch
   - Ensure CI checks pass
   - Get code review approval

## Release Process

When ready to release:

1. **Create a release branch from development**:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b release/x.y.z
   ```

2. **Version packages** (this should be done on the release branch):

   ```bash
   pnpm changeset version
   ```

   This command will:

   - Update package versions based on the changesets
   - Update the CHANGELOG.md file
   - Remove the changeset files

3. **Commit the version changes**:

   ```bash
   git add .
   git commit -m "chore: version packages for release"
   ```

4. **Open a PR from the release branch to main**:

   - This is a final review opportunity
   - When merged, the CI will automatically publish to npm

5. **After the release**:
   - Merge the release branch back to development:
   ```bash
   git checkout development
   git merge --no-ff release/x.y.z
   git push origin development
   ```

## Hotfix Process

For urgent production fixes:

1. **Create a hotfix branch from main**:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-issue
   ```

2. **Make your fix and create a changeset**

3. **Version the package** directly on the hotfix branch:

   ```bash
   pnpm changeset version
   git add .
   git commit -m "chore: version packages for hotfix"
   ```

4. **Open a PR to main**:

   - When merged, the fix will be published

5. **Merge the hotfix back to development**:
   ```bash
   git checkout development
   git merge --no-ff hotfix/critical-issue
   git push origin development
   ```

## Pre-release Process

For beta/alpha versions:

1. **Create a pre-release branch**:

   ```bash
   git checkout development
   git checkout -b release/x.y.z-beta
   ```

2. **Set pre-release status**:

   ```bash
   pnpm changeset pre enter beta
   ```

3. **Create and commit changesets as normal**

4. **Version the package**:

   ```bash
   pnpm changeset version
   ```

5. **When ready to finalize**:
   ```bash
   pnpm changeset pre exit
   pnpm changeset version
   ```

## Documentation

Please update documentation when:

- Adding new components
- Changing component APIs
- Adding new features
- Fixing bugs that affect user behavior

## Testing

- Write tests for new features and bug fixes
- Run tests locally before submitting a PR:
  ```bash
  pnpm test
  ```
