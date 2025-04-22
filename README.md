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
   pnpm build:package --watch
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
- `pnpm test` - Run components test (unit test)
- `pnpm test:e2e` - Run end to end tests
- `pnpm test:watch` - Open Visualized test interface
- `pnpm lint` - Lint code
- `pnpm format` - Format code

### Project Structure

- `lib/src/` - Component source code
- `lib/src/components/` - UI components
- `lib/src/utils/` - Utility functions

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information about our development workflow, branching strategy, and release process.

## License

[MIT License](./LICENSE)
