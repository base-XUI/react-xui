# React XUI Component Library

A modern React component library built with Vite, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install react-xui
# or
yarn add react-xui
# or
pnpm add react-xui
```

## Usage

```jsx
import { Button } from "react-xui";

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Local Development

### Building the Package

To build the library locally:

```bash
pnpm build:package
```

### Testing Locally with yalc

For testing the package in another local project without publishing to npm:

1. Install yalc globally (if not already installed):

   ```bash
   npm install -g yalc
   # or
   pnpm install -g yalc
   ```

2. Build and publish the package locally:

   ```bash
   # In react-xui directory
   pnpm build:package
   yalc publish
   ```

3. In your test application:

   ```bash
   # In your test app directory
   yalc add react-xui
   npm install # or pnpm install
   ```

4. When you make changes to the library:

   ```bash
   # In react-xui directory
   pnpm build:package
   yalc push
   ```

   Or use watch mode for continuous updates:

   ```bash
   pnpm build:watch
   ```

   And in another terminal:

   ```bash
   yalc push --watch
   ```

5. To remove the yalc link:

   ```bash
   # In your test app directory
   yalc remove react-xui
   npm install # or pnpm install
   ```

## Development

### Available Scripts

- `pnpm storybook` - Start Storybook for component development
- `pnpm build:storybook` - Build Storybook for deployment
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code
- `pnpm build:watch` - Build in watch mode for development

### Project Structure

- `lib/src/` - Component source code
- `lib/src/components/` - UI components
- `lib/src/utils/` - Utility functions
- `lib/tests/` - Test utilities

## Contributing

### Development Workflow

1. Create a new branch from `development`:

   ```bash
   git checkout development
   git pull
   git checkout -b feature/my-feature
   ```

2. Make your changes and commit them using conventional commits:

   ```bash
   git commit -m "feat: add new button variant"
   ```

3. Add a changeset to document your changes:

   ```bash
   pnpm changeset
   ```

   - This will prompt you to:
     - Select which packages to include in the changeset
     - Choose the type of change (major, minor, patch)
     - Write a summary of the changes

4. Commit the generated changeset file:

   ```bash
   git add .changeset/*.md
   git commit -m "chore: add changeset"
   ```

5. Push your branch and create a PR against the `development` branch:
   ```bash
   git push -u origin feature/my-feature
   ```

### Release Process

When changes are merged to the `main` branch:

1. The CI workflow will run tests and build the package
2. The release workflow will:
   - Version the packages based on changesets
   - Update changelogs
   - Publish the package to npm

If there are changesets on the `development` branch, when you merge to `main`:

- A release PR will be created automatically
- Merging this PR will trigger the version bump and publish

### Working with Changesets

- `pnpm changeset` - Create a new changeset
- `pnpm version-packages` - Bump versions and update changelogs locally
- `pnpm release` - Publish packages to npm (only runs in CI)

## License

[MIT License](./LICENSE)
