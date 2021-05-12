import Roact from '@rbxts/roact'
import { Tree } from 'animtils'

interface ExplorerProperties {
  Tree: Tree
}

interface ExplorerState {
  SelectedIndex: number
  ClosedLevels: number[]
}

function ExplorerItem (props: {
  Part: BasePart
  Level: number
  IsSelected: boolean
  Index: number
  ClosedLevel: number
  Close: () => void
  Open: () => void
}): Roact.Element {
  return props.ClosedLevel <= props.Level
    ? <></>
    : (
      <textbutton
        Size={new UDim2(1, -5, 0, 25)}
        BorderSizePixel={0}
        Text=''
        LayoutOrder={props.Index}
      >
        <imagebutton
          Image={props.ClosedLevel === props.Level + 1 ? 'rbxassetid://216066397' : 'rbxassetid://216068148'}
          Size={UDim2.fromScale(0.5, 0.5)}
          AnchorPoint={new Vector2(0.5, 0.5)}
          Position={UDim2.fromOffset(12.5, 12.5)}
          SizeConstraint={Enum.SizeConstraint.RelativeYY}
          BackgroundTransparency={1}
          Event={props.ClosedLevel === props.Level + 1 ? { Activated: props.Open } : { Activated: props.Close }}
        />
        <textlabel
          Key='Label'
          Size={new UDim2(1, -25 - ((props.Level - 1) * 25), 1, 0)}
          Position={UDim2.fromOffset(25 + ((props.Level - 1) * 25), 0)}
          BackgroundTransparency={1}
          TextXAlignment={Enum.TextXAlignment.Left}
          Text={props.Part.Name}
        />
      </textbutton>
    )
}

export class Explorer extends Roact.PureComponent<ExplorerProperties, ExplorerState> {
  constructor (props: ExplorerProperties) {
    super(props)
    this.setState({
      SelectedIndex: 0,
      ClosedLevels: new Array(props.Tree.elements.size(), 100) // eslint-disable-line @typescript-eslint/no-array-constructor
    })
  }

  setIndex (index: number, value: number): void {
    const closedLevels = this.state.ClosedLevels
    closedLevels[index] = value // haha its not immutable! screw you roact
    this.setState({
      ClosedLevels: closedLevels
    })
  }

  close (index: number): () => void {
    return () => {
      const originalLevel = this.props.Tree.level[index]
      this.setIndex(index, originalLevel + 1)
      for (let i = index; i < this.props.Tree.level.size(); i++) {
        const level = this.props.Tree.level[i]
        if (level > originalLevel) {
          this.setIndex(i, originalLevel + 1)
        } else if (i !== index) {
          break
        }
      }
      print('Done!')
    }
  }

  open (index: number): () => void {
    return () => {
      const originalLevel = this.props.Tree.level[index]
      const originalClose = this.state.ClosedLevels[index]
      for (let i = index; i < this.props.Tree.level.size(); i++) {
        const level = this.props.Tree.level[i]
        const close = this.state.ClosedLevels[i]
        if (level > originalLevel) {
          if (originalClose === close) {
            this.setIndex(i, 100)
          }
        } else if (i === index) {
          this.setIndex(i, 100)
        } else {
          break
        }
      }
    }
  }

  render (): Roact.Element | undefined {
    return (
      <frame
        Size={new UDim2(0.2, 0, 1, 0)}
      >
        <uipadding
          Key='Padding'
          PaddingBottom={new UDim(0, 5)}
          PaddingTop={new UDim(0, 5)}
          PaddingLeft={new UDim(0, 5)}
          PaddingRight={new UDim(0, 5)}
        />
        <scrollingframe
          Size={UDim2.fromScale(1, 1)}
          ScrollBarThickness={5}
          BorderSizePixel={0}
        >
          <uilistlayout SortOrder='LayoutOrder' />
          {
            this.props.Tree.elements.map((value, index) =>
              <ExplorerItem
                Key={value.Name}
                Level={this.props.Tree.level[index]}
                Part={value}
                IsSelected={index === this.state.SelectedIndex}
                ClosedLevel={this.state.ClosedLevels[index]}
                Close={this.close(index)}
                Open={this.open(index)}
                Index={index}
              />)
          }
        </scrollingframe>
      </frame>
    )
  }
}
