export function validateField(name, value) {
  if (!value || !value.trim()) {
    switch (name) {
      case 'nombre': return 'El nombre es obligatorio'
      case 'apellido': return 'El apellido es obligatorio'
      case 'email': return 'El email es obligatorio'
      case 'password': return 'La contraseña es obligatoria'
    }
  }
  if (name === 'nombre' || name === 'apellido') {
    if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s.'-]+$/.test(value)) {
      return `${name === 'nombre' ? 'El nombre' : 'El apellido'} solo debe contener letras`
    }
  }
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'El email debe ser válido'
  }
  if (name === 'password') {
    if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
    if (!/[a-z]/.test(value)) return 'Debe contener al menos una minúscula'
    if (!/[A-Z]/.test(value)) return 'Debe contener al menos una mayúscula'
    if (!/\d/.test(value)) return 'Debe contener al menos un número'
  }
  return ''
}
