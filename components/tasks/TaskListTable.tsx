import { useEffect, useState } from 'react'
import ResponsibleIcon from '@/components/icons/ResponsibleIcon'
import DocumentAddIcon from '@/components/icons/DocumentAddIcon'
import ArrowFitIcon from '@/components/icons/ArrowFitIcon'
import ChatIcon from '@/components/icons/ChatIcon'
import ChatHoverIcon from '@/components/icons/ChatHoverIcon'
import AddIcon from '@/components/icons/AddIcon'
import PeopleSuggested from '@/components/main/PeopleSuggested'
import Link from 'next/link'
import useFile from '@/hooks/useFile'
import WordIcon from '../icons/WordIcon'
import ExcelIcon from '../icons/ExcelIcon'
import { Task, TaskList } from '@/hooks/types/Task'
import useTasks from '@/hooks/useTasks'
import UserSelector from '../main/UserSelector'
import useProjects from '@/hooks/useProjects'

type Props = {
  idPhase: number
  projectId: string
  tasks: TaskList
  loading: boolean
}

const colors = {
  Critica: {
    bgPriority: 'border-t-solid border-t-gray3 border-t-2 bg-prioridadCritica'
  },
  Alta: {
    bgPriority: 'border-t-solid border-t-gray3 border-t-2 bg-prioridadAlta'
  },
  Media: {
    bgPriority: 'border-t-solid border-t-gray3 border-t-2 bg-prioridadMedia'
  },
  Baja: {
    bgPriority: 'border-t-solid border-t-gray3 border-t-2 bg-prioridadBaja'
  },
  Listo: {
    bgStatus: 'border-t-solid border-t-gray3 border-t-2 bg-estadoListo'
  },
  'En Curso': {
    bgStatus: 'border-t-solid border-t-gray3 border-t-2 bg-estadoEnCurso'
  },
  Detenido: {
    bgStatus: 'border-t-solid border-t-gray3 border-t-2 bg-estadoDetenido'
  },
  'No Iniciado': {
    bgStatus: 'border-t-solid border-t-gray3 border-t-2 bg-estadoNoIniciado'
  }
}

type StatusDict = {
  [key: string]: string
}

const statusDict: StatusDict = {
  Listo: 'doneTasks',
  'En Curso': 'startedTasks',
  Detenido: 'stoppedTasks',
  'No Iniciado': 'notStartedTasks'
}

const TaskListTable = ({ idPhase, tasks, loading }: Props) => {
  const { uploadFile, progress, downloadURL } = useFile()
  const { updateTask } = useTasks()
  const { updateIncrementalField } = useProjects()

  const [ids, setIds] = useState([])

  const [controls, setControls] = useState<
    {
      id: number
      chat: boolean
      isOpenPriority: boolean
      isClickResponsible: boolean
      statePriority: string
      bgPriority: string
      isOpenStatus: boolean
      stateStatus: string
      bgStatus: string
      isWord: boolean
      isExcel: boolean
    }[]
  >([])

  const [reload, setReload] = useState(false)
  const [files, setFiles] = useState<any>([])

  let cont = 0

  useEffect(() => {
    if (!reload) {
      for (const key in tasks) {
        const newControl = {
          id: cont,
          chat: false,
          isOpenPriority: false,
          isClickResponsible: false,
          statePriority: tasks[key].priority,
          bgPriority: colors[tasks[key].priority].bgPriority,
          isOpenStatus: false,
          stateStatus: tasks[key].status,
          bgStatus: colors[tasks[key].status].bgStatus,
          isWord: false,
          isExcel: false
        }
        const newFileList: File[] = []
        const fileAux = files
        const aux = controls
        fileAux.push(newFileList)
        aux.push(newControl)
        setFiles(fileAux)
        setControls(aux)
        cont++
        if (Object.keys(tasks).length === controls.length) {
          setReload(true)
        }
      }
    }
  }, [tasks, reload])

  const changeStatusChat = (id: number, status: boolean) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          chat: status
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeOpenPriority = (id: number) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          isOpenPriority: !control.isOpenPriority
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeClickResponsible = (id: number) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          isClickResponsible: !control.isClickResponsible
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeOpenStatus = (id: number) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          isOpenStatus: !control.isOpenStatus
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const handleClickPriority = (
    id: number,
    status: string,
    bg: string,
    item: Task
  ) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        updateTask(item.id, 'priority', status)
        return {
          ...control,
          isOpenPriority: false,
          statePriority: status,
          bgPriority: bg
        }
      } else {
        return control
      }
    })
    const elem = document.getElementById(idPhase + '-Priority' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById(idPhase + '-Text' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  const handleClickStatus = (
    id: number,
    status: string,
    bg: string,
    item: Task
  ) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
        if (status === 'Listo') {
          updateIncrementalField(item.projectId, 'doneTasks', '++')
          updateIncrementalField(item.projectId, statusDict[item.status], '--')
        } else if (status === 'En Curso') {
          updateIncrementalField(item.projectId, 'startedTasks', '++')
          updateIncrementalField(item.projectId, statusDict[item.status], '--')
        } else if (status === 'Detenido') {
          updateIncrementalField(item.projectId, 'stoppedTasks', '++')
          updateIncrementalField(item.projectId, statusDict[item.status], '--')
        } else if (status === 'No Iniciado') {
          updateIncrementalField(item.projectId, 'notStartedTasks', '++')
          updateIncrementalField(item.projectId, statusDict[item.status], '--')
        }
        updateTask(item.id, 'status', status)
        return {
          ...control,
          isOpenStatus: false,
          stateStatus: status,
          bgStatus: bg
        }
      } else {
        return control
      }
    })
    const elem = document.getElementById(idPhase + '-Status' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById(idPhase + '-TextStatus' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }

  const handleFile = (id: number, e: any) => {
    let auxFiles = files
    let newWord = controls[id].isWord
    let newExcel = controls[id].isExcel
    let name = ''
    for (let i = 0; i < e.target.files.length; i++) {
      auxFiles[id].push(e.target.files[i])
      name = e.target.files[i].name
      if (name.includes('docx')) {
        newWord = true
      }
      if (name.includes('xlsx')) {
        newExcel = true
      }
    }
    setFiles(auxFiles)

    const newControls = controls.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          isWord: newWord,
          isExcel: newExcel
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }

  const handleUpload = async (id: number) => {
    if (files[id].length !== 0) {
      let auxFiles = files
      for (let i = 0; i < auxFiles[id].length; i++) {
        await uploadFile(auxFiles[id][i])
      }
      auxFiles[id] = []
      const newControls = controls.map((control) => {
        if (control.id === id) {
          return {
            ...control,
            isWord: false,
            isExcel: false
          }
        } else {
          return control
        }
      })
      setControls(newControls)
    } else {
    }
  }

  if (loading) return <>Cargando...</>
  return (
    <>
      {controls.length > 0 && (
        <div>
          <div className="rounded-t-lg border-solid border-gray3 border-2">
            <table>
              <thead>
                <tr className="py-4">
                  <th
                    scope="col"
                    className="bg-cell rounded-tl-lg font-nunito font-light w-[10%] leading-loose"
                  >
                    Tareas
                  </th>
                  <th
                    scope="col"
                    className="bg-cell font-nunito font-light w-[10%] leading-loose"
                  >
                    {' '}
                    Responsables
                  </th>
                  <th
                    scope="col"
                    className="bg-cell font-nunito font-light w-[10%] leading-loose"
                  >
                    {' '}
                    Fecha esperada
                  </th>
                  <th
                    scope="col"
                    className="bg-cell font-nunito font-light w-[10%] leading-loose"
                  >
                    {' '}
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="bg-cell font-nunito font-light w-[10%] leading-loose"
                  >
                    {' '}
                    Prioridad
                  </th>
                  <th
                    scope="col"
                    className="bg-cell rounded-tr-lg font-nunito font-light w-[10%] leading-loose"
                  >
                    {' '}
                    Archivos
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(tasks).map((item, i) => (
                  <tr key={i}>
                    <td className="border-t-solid border-t-gray3 border-t-2">
                      <div
                        className="flex hover:border-solid hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2"
                      >
                        <div className="w-[85%] grid grid-cols-2 group">
                          <p>{tasks[item].name}</p>
                          <div className="self-end group">
                            <div className="invisible group-hover:visible">
                              <Link
                                className="flex text-gray3 text-sm"
                                href={`/tasks/${tasks[item].id}`}
                              >
                                Abrir
                                <div className="w-5 h-4">
                                  {' '}
                                  <ArrowFitIcon />{' '}
                                </div>
                              </Link>
                              <div className="flex relative -bottom">
                                <div className="absolute grid place-items-center">
                                  <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                  <p className="bg-black2 p-1 w-[100%] text-white1 text-center rounded-md text-xs">
                                    Abrir pestaña
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-[15%]"
                          onMouseOut={() => {
                            changeStatusChat(i, false)
                          }}
                          onMouseOver={() => {
                            changeStatusChat(i, true)
                          }}
                        >
                          {controls[i].chat ? (
                            <div>
                              <button className="h-7 grid align-center justify-center">
                                <ChatHoverIcon />
                              </button>
                              <div className="relative -bottom">
                                <div className="absolute grid place-items-center">
                                  <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                  <div className="bg-black2 p-1 w-[100%] text-white1 text-center rounded-md text-xs">
                                    {' '}
                                    <p>Chat</p>{' '}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid place-items-center">
                              <button className="h-7 p-0">
                                <ChatIcon />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2 group">
                      <div
                        className="border-solid border-2 border-transparent hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2"
                      >
                        <button
                          onClick={() => {
                            changeClickResponsible(i)
                          }}
                        >
                          <div className="">
                            <div className="h-4 bg-black2 place-self-center"></div>
                            <div className="relative">
                              <div className="invisible group-hover:visible mx-1 my-1 absolute -bottom-2 left-0 h-4 w-4">
                                <AddIcon />
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                      {controls[i].isClickResponsible && (
                        <div className="relative -bottom">
                          <div className="absolute grid place-items-center w-96">
                            <UserSelector label="Test" setIds={setIds} />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2">
                      <input
                        type="date"
                        defaultValue={tasks[item]?.expectedDate?.toDate().toISOString().split('T')[0] ?? null}
                        onChange={(e) => updateTask(item, 'expectedDate', e.target.valueAsDate)}
                        className="w-[100%] rounded-none text-center"
                      ></input>
                    </td>
                    <td
                      className={`border-t-solid border-t-gray3 border-t-2 ${controls[i].bgStatus}`}
                      id={idPhase + '-Status' + controls[i].id}
                    >
                      <div
                        className="hover:border-solid hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2"
                      >
                        <button
                          className="w-[100%]"
                          onClick={() => changeOpenStatus(i)}
                        >
                          <p
                            className="text-white1"
                            id={idPhase + '-TextStatus' + controls[i].id}
                          >
                            {controls[i].stateStatus}
                          </p>
                          {controls[i].isOpenStatus && (
                            <div className="relative -bottom">
                              <div className="absolute grid place-items-center w-[100%]">
                                <div
                                  className="w-0 h-0
                                      bg-transparent
                                      border-l-8 border-l-transparent
                                      border-b-8 border-b-white1
                                      border-r-8 border-r-transparent"
                                ></div>
                                <div className="bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg">
                                  <p
                                    className="bg-estadoListo text-white1"
                                    onClick={() =>
                                      handleClickStatus(
                                        i,
                                        'Listo',
                                        'border-t-solid border-t-gray3 border-t-2 bg-estadoListo',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Listo
                                  </p>
                                  <p
                                    className="bg-estadoEnCurso text-white1"
                                    onClick={() =>
                                      handleClickStatus(
                                        i,
                                        'En Curso',
                                        'border-t-solid border-t-gray3 border-t-2 bg-estadoEnCurso',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    En Curso
                                  </p>
                                  <p
                                    className="bg-estadoDetenido text-white1"
                                    onClick={() =>
                                      handleClickStatus(
                                        i,
                                        'Detenido',
                                        'border-t-solid border-t-gray3 border-t-2 bg-estadoDetenido',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Detenido
                                  </p>
                                  <p
                                    className="bg-estadoNoIniciado text-white1"
                                    onClick={() =>
                                      handleClickStatus(
                                        i,
                                        'No Iniciado',
                                        'border-t-solid border-t-gray3 border-t-2 bg-estadoNoIniciado',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    No Iniciado
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </td>
                    <td
                      className={`border-t-solid border-t-gray3 border-t-2 ${controls[i].bgPriority}`}
                      id={idPhase + '-Priority' + controls[i].id}
                    >
                      <div>
                        <button
                          className="w-[100%] group
                        hover:border-solid hover:border-blue2 hover:border-2
                        active:border-solid active:border-blue2 active:border-2
                        focus:border-solid focus:border-blue2 focus:border-2"
                          onClick={() => changeOpenPriority(i)}
                        >
                          <p
                            className="text-white1"
                            id={idPhase + '-Text' + controls[i].id}
                          >
                            {controls[i].statePriority}
                          </p>
                          {controls[i].isOpenPriority && (
                            <div className="relative -bottom">
                              <div className="absolute grid place-items-center w-[100%]">
                                <div
                                  className="w-0 h-0
                                bg-transparent
                                border-l-8 border-l-transparent
                                border-b-8 border-b-white1
                                border-r-8 border-r-transparent"
                                ></div>
                                <div className="bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg">
                                  <p
                                    className="bg-prioridadCritica text-white1"
                                    onClick={() =>
                                      handleClickPriority(
                                        i,
                                        'Critica',
                                        'border-t-solid border-t-gray3 border-t-2 bg-prioridadCritica',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Crítica
                                  </p>
                                  <p
                                    className="bg-prioridadAlta text-white1"
                                    onClick={() =>
                                      handleClickPriority(
                                        i,
                                        'Alta',
                                        'border-t-solid border-t-gray3 border-t-2 bg-prioridadAlta',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Alta
                                  </p>
                                  <p
                                    className="bg-prioridadMedia text-white1"
                                    onClick={() =>
                                      handleClickPriority(
                                        i,
                                        'Media',
                                        'border-t-solid border-t-gray3 border-t-2 bg-prioridadMedia',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Media
                                  </p>
                                  <p
                                    className="bg-prioridadBaja text-white1"
                                    onClick={() =>
                                      handleClickPriority(
                                        i,
                                        'Baja',
                                        'border-t-solid border-t-gray3 border-t-2 bg-prioridadBaja',
                                        tasks[item]
                                      )
                                    }
                                  >
                                    Baja
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2 group">
                      <div className="w-[100%] h-[100%] grid justify-items-center grid-cols-4">
                        <label
                          title="Click para seleccionar archivos"
                          className="w-[100%]
                          hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          <div className="w-[60%] col-span-1">
                            <input
                              type="file"
                              hidden
                              multiple
                              accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              onChange={(e) => handleFile(i, e)}
                            ></input>
                            <DocumentAddIcon />
                          </div>
                        </label>
                        <button
                          onClick={() => handleUpload(i)}
                          className="w-[100%] col-span-2 hover:border-solid hover:border-blue2 hover:border-2
                        active:border-solid active:border-blue2 active:border-2
                        focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          Guardar
                        </button>
                        {(controls[i].isWord || controls[i].isExcel) && (
                          <label
                            title={`${files[i].map(
                              (loadedFiles: { name: string }) =>
                                loadedFiles.name + '\n'
                            )}`}
                            className=" flex items-top
                          hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                          >
                            <div className="w-[100%] col-span-1 grid justify-items-center grid-cols-2">
                              {controls[i].isWord && <WordIcon />}
                              {controls[i].isExcel && <ExcelIcon />}
                            </div>
                          </label>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      )}
    </>
  )
}

export default TaskListTable
