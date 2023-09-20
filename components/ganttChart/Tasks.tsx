export default function Tasks ({ tasks, setTasks, setTaskDurations }) {
  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>

      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row ">
            <input data-task-id={tsk?.id} value={tsk?.name} />
          </div>
        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  )
}
