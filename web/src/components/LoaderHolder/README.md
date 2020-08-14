# LoaderHolder

Компонент который запускает загрузку данных и 
отображает когда данные были успешно загружены

Пример использования:
```
const [data, setData] = useState()
const loader = useCallback(async () => {
  const data = await loadData();
  setData(data)
}, [loadData])

return (
  <LoaderHolder loader={loader}>
    <TableData data={data} />
  </LoaderHolder>
)
```