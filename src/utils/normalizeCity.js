export function normalizeCity(input) {
  const map = {
    japon: 'Tokyo',
    japan: 'Tokyo',
    brasil: 'São Paulo',
    brazil: 'São Paulo',
    francia: 'Paris',
    france: 'Paris',
    india: 'New Delhi',
    méxico: 'Mexico City',
    mexico: 'Mexico City',
    alemania: 'Berlin',
    germany: 'Berlin',
    españa: 'Madrid',
    spain: 'Madrid',
    estadosunidos: 'New York',
    'estados unidos': 'New York',
    usa: 'New York',
    unitedstates: 'New York',
    canadá: 'Toronto',
    canada: 'Toronto',
    colombia: 'Bogotá',
    perú: 'Lima',
    peru: 'Lima',
    argentina: 'Buenos Aires',
    chile: 'Santiago',
    venezuela: 'Caracas',
    italia: 'Rome',
    italy: 'Rome'
  };

  const normalizedInput = input.toLowerCase().trim().replace(/\s+/g, '');
  return map[normalizedInput] || input;
}
