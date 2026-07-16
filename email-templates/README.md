# 4 Star Logistics — Email Templates

Six branded HTML emails matching the website design (dark navy #0F1120, gold #D9A860, DM Sans / Inter).

| File | Trigger | Recipient |
|---|---|---|
| `quote-internal.html` | Quote form submission | Internal team (dispatch@ / info@) |
| `quote-customer.html` | Quote form submission | Customer who submitted |
| `contact-internal.html` | Contact form submission | Internal team |
| `contact-customer.html` | Contact form submission | Customer |
| `onboarding-internal.html` | Onboarding form submission | Internal team |
| `onboarding-customer.html` | Onboarding form submission | Carrier applicant |

## Merge tags

The emails use generic `{{placeholder}}` syntax. When pasting into GHL, swap for the correct GHL merge tag:

**Customer emails (GHL native contact fields):**
- `{{first_name}}` → `{{contact.first_name}}`
- `{{email}}` → `{{contact.email}}`
- `{{company}}` → `{{contact.company_name}}`
- `{{phone}}` → `{{contact.phone}}`

**Form-specific fields (mapped from webhook payload → custom fields in GHL):**
- Quote form: `{{service}}`, `{{pickup}}`, `{{delivery}}`, `{{cargo}}`, `{{weight}}`, `{{timeline}}`, `{{notes}}`
- Contact form: `{{subject}}`, `{{message}}`
- Onboarding form: `{{company_name}}`, `{{contact_name}}`

In GHL, custom field merge tags look like `{{contact.pickup_location}}` — depends on the field name you create.

## Usage in GHL

1. Open the workflow triggered by the inbound webhook
2. Add an **Email** action
3. Paste the HTML into the email body (switch editor to HTML/code mode)
4. Replace `{{placeholder}}` with GHL merge tags
5. Set From name/email and Subject line (suggested subjects at top of each file as a comment)
6. Send a test using a real webhook payload
