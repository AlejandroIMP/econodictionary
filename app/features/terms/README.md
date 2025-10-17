# Terms Feature - Component Documentation

This directory contains all the components and logic for the terms feature of the Economic Dictionary application.

## 📁 Directory Structure

```
app/features/terms/
├── components/
│   ├── Filter.tsx          # Category filtering component
│   ├── Search.tsx          # Search input component
│   ├── TermsList.tsx       # Terms grid/list display
│   ├── NavigationMenu.tsx  # Terms section navigation
│   └── index.ts            # Barrel export
└── types.ts                # TypeScript interfaces

app/routes/terms/
├── layout.tsx              # Terms section layout with nav
├── home.tsx                # Terms listing page
├── term.tsx                # Individual term detail page
└── create-term.tsx         # Create new term form
```

## 🎨 Components

### Search Component
**Location:** `app/features/terms/components/Search.tsx`

A mobile-first search input with clear functionality.

**Props:**
- `value: string` - Current search value
- `onChange: (value: string) => void` - Callback when search changes
- `placeholder?: string` - Placeholder text (default: "Search terms...")
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Search
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search by name or definition..."
/>
```

### Filter Component
**Location:** `app/features/terms/components/Filter.tsx`

Category filter with visual feedback for active filters.

**Props:**
- `selectedCategory: string` - Currently selected category
- `onCategoryChange: (category: string) => void` - Callback when category changes
- `categories?: string[]` - Array of available categories
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Filter
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>
```

**Default Categories:**
- All Categories
- Macroeconomics
- Microeconomics
- Finance
- International Trade
- Development Economics
- Labor Economics
- Other

### TermsList Component
**Location:** `app/features/terms/components/TermsList.tsx`

Responsive grid display of term cards with loading states.

**Props:**
- `terms: Term[]` - Array of terms to display
- `isLoading?: boolean` - Shows skeleton loaders when true
- `emptyMessage?: string` - Message when no terms found
- `className?: string` - Additional CSS classes

**Features:**
- Responsive grid (1 column mobile, 2 tablet, 3 desktop)
- Approval status badges
- Category badges
- Truncated text with line-clamp
- Loading skeletons
- Empty state handling

**Usage:**
```tsx
<TermsList
  terms={filteredTerms}
  isLoading={isLoading}
  emptyMessage="No terms match your criteria"
/>
```

### NavigationMenu Component
**Location:** `app/features/terms/components/NavigationMenu.tsx`

Section navigation for the terms feature.

**Features:**
- Active state highlighting
- Mobile-responsive (icons only on small screens)
- Horizontal scrolling on small devices

## 📄 Pages

### Terms Home (`/terms`)
**Location:** `app/routes/terms/home.tsx`

Main listing page with search, filter, and terms list.

**Features:**
- Real-time search
- Category filtering
- Results count
- Create new term button
- Responsive layout

### Term Detail (`/terms/:id`)
**Location:** `app/routes/terms/term.tsx`

Individual term detail page showing all term information.

**Features:**
- Full definition and example
- Approval status
- Media attachments (image/audio)
- Creation/update timestamps
- Rejection reason (if applicable)
- Back navigation

### Create Term (`/terms/create`)
**Location:** `app/routes/terms/create-term.tsx`

Form to create a new term with validation.

**Features:**
- Form validation using Zod
- React Hook Form integration
- Required field indicators
- Loading state during submission
- Mobile-first responsive design
- Optional media fields

**Validation Rules:**
- **Name:** 2-100 characters
- **Definition:** 10-1000 characters
- **Category:** Required selection
- **Example:** 10-500 characters
- **Image/Audio IDs:** Optional

## 🎯 TypeScript Types

**Location:** `app/features/terms/types.ts`

### Term Interface
```typescript
interface Term {
  id: string;
  name: string;
  definition: string;
  category: string;
  example: string;
  authorId: string;
  isApproved: boolean;
  approvedBy: boolean;
  approvedAt: string;
  rejectionReason: string;
  imageId: string;
  audioId: string;
  moderationNotes: string;
  createdAt: string;
  updatedAt: string;
}
```

### CreateTermRequest Interface
```typescript
interface CreateTermRequest {
  name: string;
  definition: string;
  category: string;
  example: string;
  imageId?: string;
  audioId?: string;
}
```

## 🎨 UI Components

Shared UI components are located in `app/features/shared/components/ui/`:

- **Button** - Customizable button with variants (default, outline, ghost, etc.)
- **Input** - Styled text input
- **Textarea** - Multi-line text input
- **Label** - Form label
- **Select** - Dropdown select
- **Card** - Content container with header, content, footer
- **Badge** - Status and category indicators

## 📱 Mobile-First Design

All components are built with a mobile-first approach:

1. **Responsive Typography**
   - Text scales: `text-sm sm:text-base`
   - Headers: `text-2xl sm:text-3xl lg:text-4xl`

2. **Flexible Layouts**
   - Stack on mobile, row on desktop: `flex-col sm:flex-row`
   - Grid columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

3. **Touch-Friendly**
   - Minimum button height: `h-10` (40px)
   - Adequate spacing: `gap-4`
   - Clear interactive states

4. **Performance**
   - Skeleton loaders for better perceived performance
   - Optimistic UI updates
   - Debounced search (if implemented)

## 🔄 Data Flow

1. **Listing Page:**
   ```
   API → State → Filter/Search → Filtered Data → TermsList
   ```

2. **Detail Page:**
   ```
   Route Params → API Fetch → Display
   ```

3. **Create Form:**
   ```
   Form Input → Validation → API Submit → Navigate
   ```

## 🚀 Integration with API

To connect with your actual API:

1. **Replace mock data** in `home.tsx` with API calls
2. **Implement fetch** in `term.tsx` using route params
3. **Update submission** in `create-term.tsx` with actual API endpoint

**Example API Integration:**
```tsx
// In home.tsx
const [terms, setTerms] = useState<Term[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function fetchTerms() {
    try {
      const response = await fetch('/api/terms');
      const data = await response.json();
      setTerms(data);
    } catch (error) {
      console.error('Failed to fetch terms:', error);
    } finally {
      setIsLoading(false);
    }
  }
  fetchTerms();
}, []);
```

## 🎨 Styling

- **Framework:** Tailwind CSS v4
- **Design System:** Zinc color palette
- **Dark Mode:** Full support via `dark:` variants
- **Animations:** Smooth transitions and loading states

## 📦 Dependencies

- `react-router` - Navigation and routing
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants
- `tailwind-merge` & `clsx` - Class name utilities

## 🔍 Accessibility

- Semantic HTML elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

## 🐛 Known Limitations

- Mock data currently used (needs API integration)
- No pagination implemented yet
- No real-time updates
- Media upload not implemented (only IDs)
- No error boundary for API failures

## 📝 Future Enhancements

- [ ] Pagination or infinite scroll
- [ ] Advanced filtering (approval status, date range)
- [ ] Sorting options
- [ ] Bulk actions
- [ ] Term editing
- [ ] Term deletion with confirmation
- [ ] Media file upload
- [ ] Audio pronunciation playback
- [ ] Image preview
- [ ] Share functionality
- [ ] Print-friendly view
- [ ] Export to PDF/CSV
