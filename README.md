# Host Application - MicroFrontend Hub

The main host application that orchestrates and loads all micro frontend remotes using Module Federation.

## Features

- 🏠 **Central Dashboard** - Overview of all available micro frontends
- 🔗 **Module Federation** - Dynamic loading of remote applications
- 🎯 **Unified Navigation** - Single header navigation across all apps
- 👤 **User Context** - Shared user state across micro frontends
- ⚡ **Error Boundaries** - Graceful handling of remote app failures
- 🎨 **Consistent UI** - Shared styling and components

## Architecture

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite + @originjs/vite-plugin-federation
- **Routing**: React Router DOM (centralized)
- **Styling**: Organized CSS (components.css, layout.css)
- **Port**: 5000 (host application)

## Remote Applications

The host consumes these micro frontends:

- **Products App** (localhost:5001) - Product management
- **Orders App** (localhost:5002) - Order management
- **Users App** (localhost:5003) - User management

## Development

```bash
# Install dependencies
pnpm install

# Start the host application
pnpm dev

# Visit: http://localhost:5000
```

**Important**: Remote apps must be built and running in preview mode for federation to work:

```bash
# In each remote app directory:
pnpm build && pnpm preview
```

## Module Federation Configuration

The host is configured to consume remotes via `vite.config.ts`:

```typescript
federation({
  name: 'host',
  remotes: {
    productsApp: 'http://localhost:5001/assets/remoteEntry.js',
    ordersApp: 'http://localhost:5002/assets/remoteEntry.js',
    usersApp: 'http://localhost:5003/assets/remoteEntry.js',
  }
})
```

## Error Handling

- **Loading States**: Shows loading spinners while remote apps load
- **Error Boundaries**: Graceful fallbacks if remote apps fail to load
- **Retry Mechanisms**: Users can retry failed remote loads
- **Development Hints**: Helpful troubleshooting information

This is the central orchestration point for the entire micro frontend architecture!
