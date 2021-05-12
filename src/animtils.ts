import { Path } from 'pathResolve'

export const ANIM_OUT_RESOLUTION = 0.1

export class Tree<T extends Instance> {
  map: Map<Path, Array<InstanceProperties<T>>> = new Map()
  parent: Instance

  constructor (parent: Instance) {
    this.parent = parent
  }

  addPath (path: Path): void {

  }

  mutateKeyframe (path: Path, time: number, keyframe: InstanceProperties<T>): void {

  }
}
