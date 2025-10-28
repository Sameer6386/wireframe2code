# Button Component

A versatile button component built on Radix UI with multiple variants and sizes for different use cases.

### Purpose

The Button component provides a consistent, accessible, and styled button interface throughout the application. It supports:
- Multiple visual variants for different action types
- Various sizes for different UI contexts
- Full keyboard and screen reader accessibility
- Composition pattern via asChild prop
- All native button HTML attributes

Use this component for any clickable action in the UI, from form submissions to navigation triggers.

### Import

```typescript
import { Button } from '@/components/ui/button'
```

### Props/Parameters

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | No | `'default'` | Visual style variant |
| size | `'default' \| 'sm' \| 'lg' \| 'icon'` | No | `'default'` | Button size |
| asChild | `boolean` | No | `false` | Render as child element using Radix Slot |
| className | `string` | No | - | Additional CSS classes |
| disabled | `boolean` | No | `false` | Disable the button |
| onClick | `(event: React.MouseEvent) => void` | No | - | Click handler |
| type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Button type attribute |
| children | `React.ReactNode` | No | - | Button content |

#### Prop Details

**variant:**
- `default`: Primary brand color with shadow, ideal for main actions
- `destructive`: Red/warning color for delete or dangerous actions
- `outline`: Bordered style for secondary actions
- `secondary`: Muted color for tertiary actions
- `ghost`: Minimal style with hover effect, good for toolbar buttons
- `link`: Styled as an underlined link

**size:**
- `default`: Standard height (36px) suitable for most use cases
- `sm`: Smaller height (32px) for compact UIs or inline actions
- `lg`: Larger height (40px) for prominent CTAs
- `icon`: Square dimensions (36x36px) optimized for icon-only buttons

**asChild:**
When true, the button doesn't render a button element but passes its props to its child. Useful for rendering buttons as links or custom elements while maintaining button styles.

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| default | Solid background with primary color | Primary actions, form submissions |
| destructive | Red/danger color with emphasis | Delete, remove, or destructive actions |
| outline | Border with transparent background | Secondary actions, cancel buttons |
| secondary | Muted background color | Alternative actions, less emphasis |
| ghost | No background, minimal styling | Toolbar buttons, icon buttons in lists |
| link | Text with underline on hover | In-text actions, navigation links |

### Usage Examples

#### Basic Usage

```tsx
<Button>Click me</Button>
```

#### Variant Examples

```tsx
// Primary action
<Button variant="default">Save Changes</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Minimal style
<Button variant="ghost">Close</Button>

// Link style
<Button variant="link">Learn More</Button>
```

#### Size Examples

```tsx
// Small button
<Button size="sm">Small Button</Button>

// Large button
<Button size="lg">Large CTA</Button>

// Icon-only button
<Button size="icon">
  <TrashIcon />
</Button>
```

#### With Icons

```tsx
import { Upload, Download, Trash2 } from 'lucide-react'

// Icon with text
<Button>
  <Upload />
  Upload File
</Button>

// Icon only
<Button size="icon" variant="ghost">
  <Download />
</Button>
```

#### As Child (Composition Pattern)

```tsx
// Render as a Next.js Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Render as an anchor tag
<Button asChild variant="link">
  <a href="https://example.com" target="_blank">
    External Link
  </a>
</Button>
```

#### With State Management

```tsx
const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  setLoading(true)
  await submitForm()
  setLoading(false)
}

<Button
  onClick={handleSubmit}
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save'}
</Button>
```

#### Real-world Example (Form Submission)

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export function CreateDesignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreate = async () => {
    setIsSubmitting(true)
    try {
      await createDesign()
      toast.success('Design created successfully')
    } catch (error) {
      toast.error('Failed to create design')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleCreate}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating...' : 'Create Design'}
      </Button>

      <Button
        variant="outline"
        onClick={() => window.history.back()}
      >
        Cancel
      </Button>
    </div>
  )
}
```

### Accessibility

#### Keyboard Navigation
- **Tab**: Focus the button
- **Enter** or **Space**: Activate the button
- **Shift + Tab**: Focus previous element
- Focus ring visible via `focus-visible:ring-1` for keyboard navigation only

#### Screen Reader Support
- Uses semantic `<button>` element by default
- Inherits `aria-label` and `aria-describedby` via spread props
- Disabled state automatically communicated via `disabled` attribute
- When using `asChild` with links, ensure proper ARIA roles are maintained

```tsx
// Good: Explicit label for icon-only button
<Button size="icon" aria-label="Delete item">
  <TrashIcon />
</Button>

// Good: Description for complex actions
<Button aria-describedby="delete-warning">
  Delete Account
</Button>
<p id="delete-warning" className="sr-only">
  This action cannot be undone
</p>
```

#### Color Contrast
- All variants meet WCAG AA standards (4.5:1 for normal text)
- Hover states maintain sufficient contrast
- Disabled state uses `opacity-50` for clear visual indication
- Works with both light and dark themes

#### Other Considerations
- Minimum touch target size of 36x36px (default size)
- `disabled:pointer-events-none` prevents accidental clicks
- Respects user's motion preferences (smooth transitions can be disabled)
- Clear visual feedback on hover, focus, and active states

### Styling

#### Default Styles
- Rounded corners (`rounded-md`)
- Medium font weight
- Smooth color transitions
- Focus ring on keyboard navigation
- Shadow on elevated variants
- Icon auto-sizing with 16px default

#### Customization

```tsx
// Additional classes
<Button className="w-full mt-4">
  Full Width Button
</Button>

// Custom colors (override with Tailwind)
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Color
</Button>

// Combining variants with custom styles
<Button variant="outline" className="border-2 border-dashed">
  Dashed Border
</Button>
```

#### Theming
The button automatically adapts to theme changes:
- Uses CSS variables for colors (primary, destructive, etc.)
- Responds to `next-themes` dark mode
- Color values defined in `app/globals.css`

### Edge Cases

#### Error States
```tsx
// Show error with destructive variant
<Button
  variant="destructive"
  onClick={() => toast.error('Action failed')}
>
  Error Action
</Button>
```

#### Loading States
```tsx
// Disable during loading
<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// With loading spinner
<Button disabled={isLoading}>
  {isLoading && <LoadingSpinner />}
  Submit
</Button>
```

#### Empty States
- Component handles undefined children gracefully
- Icon-only buttons should use `size="icon"` for proper dimensions
- Always provide aria-label for buttons without text

#### Boundary Conditions
- Very long text: Uses `whitespace-nowrap` to prevent wrapping; consider truncation or multi-line layouts for extensive content
- Disabled state: Automatically prevents clicks and reduces opacity
- Multiple icons: Gap spacing handles multiple children with `gap-2`
- Missing variant/size: Falls back to defaults

### Performance

- **Rendering**: Lightweight component with minimal re-renders
- **Memoization**: Uses `React.forwardRef` for ref forwarding
- **Bundle Size**: Small impact (~2KB with CVA and Radix Slot)
- **Optimization**: No need for React.memo unless used in large lists

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS custom properties support
- Focus-visible requires modern browser or polyfill
- Radix UI Slot compatible with all supported React versions

### Dependencies

- **@radix-ui/react-slot** (^1.1.1): Enables composition via `asChild`
- **class-variance-authority** (^0.7.1): Manages variant styles
- **Tailwind CSS** (^3.4.1): Styling framework
- **lucide-react**: Recommended for icons (project standard)

### Related Components

- **Loading Spinner** (`components/ui/loading-spinner.tsx`): Use inside buttons for loading states
- **Tooltip** (`components/ui/tooltip.tsx`): Add tooltips to icon-only buttons
- **Card Footer** (`components/ui/card.tsx`): Common placement for button groups

### Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should render with correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toHaveTextContent('Link Button')
  })
})
```

### Known Issues

None currently reported.

### Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-01 | Initial implementation with CVA and Radix Slot |

---

**Last Updated:** 2025-10-28
**Component Location:** `components/ui/button.tsx`
**Based On:** shadcn/ui button component
