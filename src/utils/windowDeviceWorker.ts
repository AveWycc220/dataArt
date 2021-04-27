import { WindowSize } from '../hooks/UseWindowSize'

const isNotSmallDevice = (windowSize: WindowSize, breakpoint: number): boolean => !(windowSize.width < breakpoint)

export default isNotSmallDevice