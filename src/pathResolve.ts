export type Path = string

export function toPath (instance: Instance, parent: Instance): Path {
  let out = instance.Name
  let newParent = instance
  while (newParent !== parent) {
    if (newParent.Parent === undefined) {
      return ''
    }
    newParent = newParent.Parent
    out = `${newParent.Name}.${out}`
  }
  return out
}

export function fromPath (path: Path, parent: Instance): Instance | undefined {
  const instances = path.split('.')
  for (const instanceName of instances) {
    const newParent = parent.FindFirstChild(instanceName)
    if (newParent === undefined) {
      return
    }
    parent = newParent
  }
  return parent
}
