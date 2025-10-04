export const OnChangeCount = (event, setCount) => {
    const value = event.target.value.length
    setCount(value)
}