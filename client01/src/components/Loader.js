import React from 'react'
import { Grid, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'

const Loader = React.forwardRef(function Loader({ count = 5, container = true, style, className, SkeletonProps }, ref) {
  return (
    <Grid
      ref={ref}
      style={{ width: '100%', minWidth: '50%vh', ...style }}
      {...{ container, ...(container ? { justifyContent: 'center' } : {}), className }}
    >
      <Grid item xs={10}>
        {Array.from({ length: count }, (_, index) => index + 1).map((i) => (
          <Skeleton key={i} {...SkeletonProps} />
        ))}
      </Grid>
    </Grid>
  )
})

Loader.propTypes = {
  className: PropTypes.string,
  container: PropTypes.bool,
  count: PropTypes.number,
  SkeletonProps: PropTypes.object,
  style: PropTypes.object
}

export default Loader
