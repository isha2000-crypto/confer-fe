import { useRef } from 'react'
import { useContainerDimensions } from 'src/hooks/useContainerDimentions'
import { Timeline } from 'src/interfaces/timeline.interface'

const Timeline = (props: Timeline) => {
  const parentSection: any = useRef(null)
  const { height: parentHeight, width: parentWidth } = useContainerDimensions(parentSection)

  const renderLine = () => {
    const linePosition: number = Math.round(-1 * (parentHeight / 2)) - 3

    return (
      <div className='line' style={{ top: linePosition }}>
        <svg height='5' width='100%'>
          <line x1={0} y1='5' x2={parentWidth} y2='5' stroke={'#000000'} strokeWidth='2' />
        </svg>
      </div>
    )
  }

  return (
    <div ref={parentSection}>
      <div className='outerContainer'>
        {Array.from(Array(props.totalCheckPoints).keys()).map((index: number) => {
          return (
            <div
              className={`innerContainer ${index !== props.currentCheckPoint ? 'growLess' : 'growMore'} ${
                index === 0 ? 'atStart' : index === props.totalCheckPoints - 1 ? 'atEnd' : ''
              }`}
              key={index}
            >
              <div
                className='checkpoint'
                style={{
                  background: index === props.currentCheckPoint ? '#083a54' : '#0ebbb2',
                  width: index === props.currentCheckPoint ? '3vh' : '2vh',
                  height: index === props.currentCheckPoint ? '3vh' : '2vh'
                }}
              ></div>
            </div>
          )
        })}
      </div>
      {renderLine()}
    </div>
  )
}

export default Timeline
