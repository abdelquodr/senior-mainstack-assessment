const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function safeFetch(url, options = {}) {
  const res = await fetch(url, options)
  const contentType = res.headers.get('content-type') || ''
  let payload = null
  try {
    if (contentType.includes('application/json')) payload = await res.json()
    else payload = await res.text()
  } catch (e) {
    // ignore parse errors, keep payload null
  }

  if (!res.ok) {
    const err = new Error(payload?.message || `Request failed with status ${res.status}`)
    err.status = res.status
    err.payload = payload
    throw err
  }

  return payload
}

/**
 * GET /user
 * returns user data
 * options: { signal }
 */
export async function getUser(options = {}) {
  const url = `${BASE_URL}/user`
  return safeFetch(url, { method: 'GET', ...options })
}

/**
 * GET /wallet
 * returns wallet data
 * options: { signal }
 */
export async function getWallet(options = {}) {
  const url = `${BASE_URL}/wallet`
  return safeFetch(url, { method: 'GET', ...options })
}

/**
 * GET /transactions
 * returns list of transactions
 * options: { signal }
 */
export async function getTransactions(options = {}) {
  const url = `${BASE_URL}/transactions`
  return safeFetch(url, { method: 'GET', ...options })
}

export default {
  getUser,
  getWallet,
  getTransactions,
}

