export function convertSnaps<T>(results) {
  return <T[]> results.doc.map(snap => {
    return {
      id: snap.id,
      ...<any>snap.data()
    }
  })
}
