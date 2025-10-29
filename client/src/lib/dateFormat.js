export const dateFormat = (date) => {

  {/*new Date(date) → converts the ISO string (2025-06-30T02:30:00.000Z) into a JavaScript Date object. */}
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}