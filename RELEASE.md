# Static Build

The Zonemaster GUI is a fully static web application built using:

```bash
npm run build
```

The build output is a ready-to-serve directory that can be deployed directly to any static web server.

When tagging a new release, you can package the build using:

```bash
npm run release
```
This creates a ZIP archive of the static build, which can be uploaded as an asset to the corresponding GitHub release.

## Testing the Build Locally

To test the static build locally, it must be served from the root path (/). You can use any simple static server. Here are two common options:
**Python**
```bash
python3 -m http.server 8000 --directory ./public
```

**PHP**
```bash
php -S localhost:8000 -t ./public
```

Ensure you're serving the ./public directory (or your build output folder) as the root for all assets and routing to work correctly.
