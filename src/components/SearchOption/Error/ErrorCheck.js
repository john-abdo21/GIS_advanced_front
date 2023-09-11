export const ErrorCheck = state => {
  if (state.l_min_area > state.l_max_area) return 'Minimum area should be smaller than Maximum area.'
  if (state.l_min_aed > state.l_max_aed) return 'Minimum Average Elevation Diff Value should be smaller than Maximum Average Elevation Diff'
  return '';
}