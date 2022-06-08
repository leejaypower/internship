const locationMapping = (mapTarget) => {
  const area1Name = mapTarget?.data?.results[0]?.region?.area1?.name
  const area2Name = mapTarget?.data?.results[0]?.region?.area2?.name
  return ({
    location: `${area1Name || '-'}/${area2Name || '-'}`,
    lat: mapTarget?.latitude,
    long: mapTarget?.longitude,
  })
}

export default locationMapping
