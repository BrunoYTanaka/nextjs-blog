import { ReactElement } from 'react'

function Categories({ categories }): ReactElement {
  return (
    <div>
      {categories.map(category => {
        return <div>{category.name}</div>
      })}
    </div>
  )
}

export default Categories
