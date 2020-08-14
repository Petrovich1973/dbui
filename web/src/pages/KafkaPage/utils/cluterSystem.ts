
export const cpuColor = (value: number) => {
    if (value < 30) return 'green'
    if (value < 80) return 'yellow'
    return 'red'
}