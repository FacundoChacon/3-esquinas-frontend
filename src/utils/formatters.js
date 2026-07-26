export function formatCurrency(value) {
  return '$' + (Number(value) || 0).toLocaleString('es-AR')
}

export function formatDate(dateStr, options) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', options || { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatMonth(mes) {
  if (!mes) return ''
  const [, month] = mes.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return months[parseInt(month, 10) - 1] || mes
}
