import Roact from '@rbxts/roact'
import { Tree } from 'animtils'
import { Explorer } from './explorer'

export function GraphEditor (props: { Tree: Tree }): Roact.Element {
  return (
    <frame Size={UDim2.fromScale(1, 1)}>
      <Explorer Tree={props.Tree} />
    </frame>
  )
}
