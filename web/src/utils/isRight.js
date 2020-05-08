export default ({
                    rights = [],
                    rightsCurrent = []
                }) => rights.some(right => rightsCurrent.includes(right))