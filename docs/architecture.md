# Architecture

## Data Flow

```
Stripe → Webhooks → Server → Prisma → Dashboard
          ↓
     Tax Calculator → Reports
```

## Core Entities

### User
- Creator account
- Stripe Connect link
- Tax preferences

### Transaction
- Individual payments
- GST/HST calculated
- Categorized

### TaxReport
- Quarterly or annual
- CRA-ready format
- PDF export
