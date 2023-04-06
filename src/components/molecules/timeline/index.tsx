import { Card } from '@mui/material'
import { useRef } from 'react'
import { useContainerDimensions } from 'src/hooks/useContainerDimentions'
import { Timeline } from 'src/interfaces/timeline.interface'
import classnames from './Timeline.module.scss'
import { TaskStatus } from '@custom-types/enum'

const Timeline = (props: Timeline) => {
  const parentSection: any = useRef(null)
  const { height: parentHeight, width: parentWidth } = useContainerDimensions(parentSection)

  const renderLine = () => {
    const linePosition: number = Math.round(-1 * (parentHeight / 2)) - 3

    return (
      <div className={classnames.line} style={{ top: linePosition }}>
        <svg height='5' width='100%'>
          <line x1={0} y1='5' x2={parentWidth} y2='5' stroke={'#000000'} strokeWidth='2' />
        </svg>
      </div>
    )
  }

  const getStatus = (index: number) => {
    const taskID = props.tasks[index]._id

    return props.recordings[taskID].status
  }

  return (
    <Card className={classnames.timeline_wrapper}>
      <div className={classnames.timelineContainer}>
        <div ref={parentSection} style={{ width: '50%' }}>
          <div className={classnames.outerContainer}>
            {Array.from(Array(props.totalCheckPoints).keys()).map((index: number) => {
              return (
                <div
                  className={`${classnames.innerContainer} ${
                    index !== props.currentCheckPoint ? classnames.growLess : classnames.growMore
                  } ${index === 0 ? classnames.atStart : index === props.totalCheckPoints - 1 ? classnames.atEnd : ''}`}
                  key={index}
                >
                  <div
                    className={classnames.checkpoint}
                    style={{
                      // background: index === props.currentCheckPoint ? '#083a54' : '#0ebbb2',
                      background:
                        index === props.currentCheckPoint
                          ? '#083a54'
                          : getStatus(index) === TaskStatus.OPEN
                          ? 'gray'
                          : '#0ebbb2',
                      width: index === props.currentCheckPoint ? '3vh' : '2vh',
                      height: index === props.currentCheckPoint ? '3vh' : '2vh'
                    }}
                    onClick={() => props.handlePointClick(index)}
                  ></div>
                </div>
              )
            })}
          </div>
          {renderLine()}
        </div>
      </div>
    </Card>
  )
}

export default Timeline
