import Roact from '@rbxts/roact'

const Studio = game.GetService('Studio')

const DataContext = Roact.createContext({
  Data: undefined
})

export default DataContext
