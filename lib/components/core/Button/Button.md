# Button Component

The Button component is a highly customizable and accessible button that supports various styles, states, and behaviors.

## Features

- Multiple style variants (contained, outlined, text)
- Extensive color palette (primary, secondary, success, error, warning, info)
- Three size options (small, medium, large)
- Loading states with customizable positions
- Icon support (start and end positions)
- Polymorphic component (can render as different elements)
- Full width option
- Elevation control
- Accessible by default

## Import

```tsx
import { Button } from "@/components/core/Button";
```

## Usage

### Basic Buttons

```tsx
// Simple button with default variant (contained) and color (primary)
<Button>Click me</Button>

// Different variants
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
```

### Color Variants

```tsx
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="error">Error</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>
<Button color="inherit">Inherit</Button>
```

### Sizes

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Loading States

```tsx
<Button loading>Loading</Button>
<Button loading loadingPosition="start">Loading</Button>
<Button loading loadingPosition="end">Loading</Button>

// Custom loading indicator
<Button
  loading
  loadingIndicator={<CustomSpinner />}
>
  Custom Loading
</Button>
```

### With Icons

```tsx
<Button startIcon={<IconLeft />}>Start Icon</Button>
<Button endIcon={<IconRight />}>End Icon</Button>
<Button startIcon={<IconLeft />} endIcon={<IconRight />}>
  Both Icons
</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

### As Different Elements

```tsx
// As a link
<Button component="a" href="#">Link Button</Button>

// As a custom element
<Button component="div" role="button">Custom Element</Button>
```

## Props

| Name             | Type                                                                                   | Default       | Description                            |
| ---------------- | -------------------------------------------------------------------------------------- | ------------- | -------------------------------------- |
| children         | `ReactNode`                                                                            | -             | The content of the button              |
| className        | `string`                                                                               | -             | Additional CSS classes                 |
| variant          | `'contained' \| 'outlined' \| 'text'`                                                  | `'contained'` | The variant to use                     |
| color            | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning'` | `'primary'`   | The color of the button                |
| size             | `'small' \| 'medium' \| 'large'`                                                       | `'medium'`    | The size of the button                 |
| loading          | `boolean`                                                                              | `false`       | If true, shows loading indicator       |
| loadingPosition  | `'start' \| 'center' \| 'end'`                                                         | `'center'`    | Position of loading indicator          |
| loadingIndicator | `ReactNode`                                                                            | `⌛`          | Custom loading indicator               |
| startIcon        | `ReactNode`                                                                            | -             | Icon before the children               |
| endIcon          | `ReactNode`                                                                            | -             | Icon after the children                |
| fullWidth        | `boolean`                                                                              | `false`       | If true, button takes full width       |
| disableElevation | `boolean`                                                                              | `false`       | If true, removes shadow                |
| component        | `ElementType`                                                                          | `'button'`    | The component used for the root node   |
| href             | `string`                                                                               | -             | URL for link buttons                   |
| disabled         | `boolean`                                                                              | `false`       | If true, button is disabled            |
| type             | `'button' \| 'submit' \| 'reset'`                                                      | `'button'`    | The type attribute for button elements |

## CSS Variables

The button uses these CSS custom properties for theming:

```css
:root {
  /* Colors */
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --success: 142 76% 36%;
  --success-foreground: 355 100% 100%;

  --error: 346 87% 46%;
  --error-foreground: 355 100% 100%;

  --info: 199 89% 48%;
  --info-foreground: 355 100% 100%;

  --warning: 32 95% 44%;
  --warning-foreground: 355 100% 100%;
}
```

## Customization

### Tailwind CSS Classes

You can customize the button appearance using Tailwind CSS classes:

```tsx
<Button className="bg-custom-color hover:bg-custom-hover">Custom Style</Button>
```

### Variant Styles

The button variants are defined using `cva` (class-variance-authority):

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        text: "bg-transparent hover:bg-gray-100",
        contained: "shadow-sm",
        outlined: "border bg-transparent",
      },
      // ...other variants
    },
  },
);
```

## Accessibility

- Supports keyboard navigation
- Proper ARIA attributes for disabled state
- Loading state announced by screen readers
- Proper focus management
- Supports native button attributes

## Examples

### Form Submit Button

```tsx
<Button
  type="submit"
  color="success"
  loading={isSubmitting}
  loadingPosition="start"
>
  Submit Form
</Button>
```

### Delete Button with Confirmation

```tsx
<Button color="error" startIcon={<TrashIcon />} onClick={handleDelete}>
  Delete Item
</Button>
```

### Navigation Link

```tsx
<Button component="a" href="/dashboard" color="primary" variant="text">
  Go to Dashboard
</Button>
```
