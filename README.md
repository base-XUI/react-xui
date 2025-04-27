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
   npm install # or pnpm install
   ```

## Development

### Available Scripts

- `pnpm storybook` - Start Storybook for component development
- `pnpm build:storybook` - Build Storybook for deployment
- `pnpm test:unit` - Run components test (unit test)
- `pnpm test:unit:ui` - Open Visualized components test interface
- `pnpm test:e2e` - Run end to end tests
- `pnpm test:e2e:ui` - Open Visualized e2e test interface
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
