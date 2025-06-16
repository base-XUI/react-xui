# React XUI Component Library

A modern React component library built with Vite, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install @base-xui/react-xui
# or
yarn add @base-xui/react-xui
# or
pnpm add @base-xui/react-xui
```

## Usage

```jsx
import { Button } from "@base-xui/react-xui";

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

2. When you make changes to the library:

   ````bash
   # In react-xui directory
   pnpm dev:publish  # For first-time publishing to local yalc store
   # or
   pnpm dev:link     # For subsequent updates to local yalc store
   ```
   Or use watch mode for continuous updates:

   ```bash
   # Automatically rebuilds and pushes to local yalc store on changes
   pnpm dev:watch
   ````

3. Link package to local react app:

   ```bash
   # In your test app directory
   yalc add @base-xui/react-xui
   pnpm install # or npm install
   ```

4. To remove the yalc link:

   ```bash
   # In your test app directory
   yalc remove @base-xui/react-xui
   pnpm install # or pnpm install
   ```

### Available Scripts

- `pnpm storybook` - Start Storybook for component development
- `pnpm build:package` - Build Package & generate dist folder
- `pnpm build:storybook` - Build Storybook for deployment
- `pnpm test:unit` - Run components test (unit test)
- `pnpm test:unit:ui` - Open Visualized components test interface
- `pnpm test:e2e` - Run end to end tests
- `pnpm test:e2e:ui` - Open Visualized e2e test interface
- `pnpm lint` - Lint code
- `pnpm format` - Format code
- `pnpm dev:publish` - First-time publishing to local yalc store
- `pnpm dev:link` - Update package in local yalc store
- `pnpm dev:watch` - Watch for changes and update local yalc store automatically

### Project Structure

- `lib/src/` - Component source code
- `lib/src/components/` - UI components
- `lib/src/utils/` - Utility functions

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information about our development workflow, branching strategy, and release process.

## License

[MIT License](./LICENSE)
