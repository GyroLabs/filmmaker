import Roact from '@rbxts/roact'
import { Workspace } from '@rbxts/services'
import { GraphEditor } from 'ui/graph'

export = (target: Instance) => {
  const tree = Roact.mount(
    <GraphEditor Tree={
      {
        elements: [
          Workspace.FindFirstChild('Baseplate') as BasePart,
          Workspace.FindFirstChild('Part') as BasePart,
          Workspace.FindFirstChild('Part') as BasePart,
          Workspace.FindFirstChild('Part') as BasePart,
          Workspace.FindFirstChild('Part') as BasePart,
          Workspace.FindFirstChild('Part') as BasePart
        ],
        level: [
          1,
          2,
          3,
          4,
          2,
          2
        ]
      }
    }
    />, target, 'GraphEditor')

  return () => {
    Roact.unmount(tree)
  }
}
