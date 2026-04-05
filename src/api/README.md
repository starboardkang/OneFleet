REST API scaffold:

- `core/`: shared config, HTTP client, and API errors
- `modules/`: feature-focused REST functions
- `../types/api/`: DTOs and payload types

Recommended next step:
1. Replace local state in portal/login flows with these module functions.
