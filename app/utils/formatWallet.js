

function humanizeKey(key = '') {
  // replace underscores and hyphens with spaces
  let s = String(key).replace(/[_-]+/g, ' ')
  // insert spaces before camelCase capitals
  s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  // collapse multiple spaces and trim
  s = s.replace(/\s+/g, ' ').trim()
  // title case
  return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function formatWalletSummary(wallet = {}, options = {}) {
  if (!wallet || typeof wallet !== 'object') return []

  const { formatCurrency = false, currency = 'USD', precision = 2, currencyDisplay = 'code' } = options

  const preferredOrder = [
    'ledger_balance',
    'balance',
    'pending_payout',
    'total_payout',
    'total_revenue'
  ]

  const seen = new Set()
  const rows = []

  const fmt = (val) => {
    if (formatCurrency && typeof val === 'number' && Number.isFinite(val)) {
      try {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency, currencyDisplay, minimumFractionDigits: precision, maximumFractionDigits: precision }).format(val)
      } catch (e) {
        // fallback
        return val
      }
    }
    return val
  }

  // Add preferred keys first if present
  for (const key of preferredOrder) {
    if (Object.prototype.hasOwnProperty.call(wallet, key)) {
      seen.add(key)
      rows.push({ name: humanizeKey(key), value: fmt(wallet[key]) })
    }
  }

  // Add remaining keys in insertion order
  for (const key of Object.keys(wallet)) {
    if (seen.has(key)) continue
    seen.add(key)
    rows.push({ name: humanizeKey(key), value: fmt(wallet[key]) })
  }

  return rows
}

export default formatWalletSummary
