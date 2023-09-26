import { useEffect, useState } from 'react'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import ResponsibleIcon from '@/components/icons/ResponsibleIcon'
import DocumentAddIcon from '@/components/icons/DocumentAddIcon'
import ArrowFitIcon from '@/components/icons/ArrowFitIcon'
import ChatIcon from '@/components/icons/ChatIcon'
import ChatHoverIcon from '@/components/icons/ChatHoverIcon'
import AddIcon from '@/components/icons/AddIcon'
import SearchFocusIcon from '@/components/icons/SearchFocusIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import Input from '@/components/main/Input'
import PeopleSuggested from '@/components/main/PeopleSuggested'
import Link from 'next/link'
import MiniButton from '@/components/main/MiniButton'
import ArrowIcon from '@/components/icons/ArrowIcon'
import useTasks from '@/hooks/useTasks'

type Props = {
  projectId: string
}

const TaskList = ({ projectId }: Props) => {
  const { getTaskFiltered, tasks } = useTasks()

  useEffect(() => {
    getTaskFiltered(projectId, 1)
  }, [])

  const phases = [
    {
      id: 1,
      nombre: 'FASE FORMULACIÓN DE PROYECTO'
    },
    {
      id: 2,
      nombre: 'FASE CREACIÓN DE BASES'
    },
    {
      id: 3,
      nombre: 'FASE DE ADJUDICACIÓN DEL PROYECTO'
    },
    {
      id: 4,
      nombre: 'FASE DE CONTRATACIÓN DEL PROYECTO'
    },
    {
      id: 5,
      nombre: 'FASE DE EJECUCIóN DEL PROYECTO ANTICIPO'
    },
    {
      id: 6,
      nombre: 'FASE DE EJECUCIÓN DEL PROYECTO ESTIMACIONES'
    },
    {
      id: 7,
      nombre: 'FASE DE EJECUCIÓN DEL PROYECTO DOCUMENTO DE CAMBIO'
    },
    {
      id: 8,
      nombre: 'FASE DE LIQUIDACIÓN DEL PROYECTO'
    }
  ]

  const [controlPhase, setControlPhase] = useState([
    { id: 0, isClickPhase: false },
    { id: 1, isClickPhase: false },
    { id: 2, isClickPhase: false },
    { id: 3, isClickPhase: false },
    { id: 4, isClickPhase: false },
    { id: 5, isClickPhase: false },
    { id: 6, isClickPhase: false },
    { id: 7, isClickPhase: false }
  ])
  const [controls, setControls] = useState([
    {
      id: 0,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 1,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 2,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 3,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 4,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 5,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 6,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    },
    {
      id: 7,
      chat: false,
      isOpenPriority: false,
      isClickResponsible: false,
      statePriority: 'Baja',
      bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja',
      isOpenStatus: false,
      stateStatus: 'No Iniciado',
      bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado'
    }
  ])
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
        console.log(!control.isOpenPriority)
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
  const handleClickPriority = (id: number, status: string, bg: string) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
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
    const elem = document.getElementById('Priority' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById('Text' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  const handleClickStatus = (id: number, status: string, bg: string) => {
    const newControls = controls.map((control) => {
      if (control.id === id) {
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
    const elem = document.getElementById('Status' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById('TextStatus' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  const changeClickPhase = (id: number) => {
    const newControls = controlPhase.map((control) => {
      if (control.id === id) {
        return {
          ...control,
          isClickPhase: !control.isClickPhase
        }
      } else {
        return control
      }
    })
    setControlPhase(newControls)
    console.log(controlPhase)
  }
  return (
    <div className="bg-white1 p-[2%]" lang="es-GT">
      {phases.map((phase) => (
        <div key={phase.id}>
          <div className="flex" onClick={() => changeClickPhase(phase.id - 1)}>
            <MiniButton
              icon={<ArrowDownIcon />}
              variant="arrow"
              secondaryIcon={<ArrowIcon />}
              tertiaryIcon={<ArrowIcon />}
            />
            {phase.nombre}
          </div>
          {controlPhase[phase.id - 1].isClickPhase && (
            <div>
              <table className="border-solid border-gray3 border-2 mt-4 md:mt-8">
                <thead>
                  <tr>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Tareas
                    </th>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Responsables
                    </th>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Fecha
                    </th>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Estado
                    </th>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Prioridad
                    </th>
                    <th className="border-solid border-gray3 border-2 w-[10%]">
                      Archivos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tasks).map((key, index) => (
                    <tr key={key}>
                      <td className="border-solid border-gray3 border-2">
                        <div
                          className="flex hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          <div className="w-[85%] grid grid-cols-2 group">
                            <p>{tasks[key].description}</p>
                            <div className="self-end group">
                              <div className="invisible group-hover:visible">
                                <Link
                                  className="flex text-gray3 text-sm"
                                  href="/task"
                                >
                                  Abrir
                                  <div className="w-5 h-4">
                                    <ArrowFitIcon />
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
                            className="w-[15%] border-l-solid border-l-gray3 border-l-2"
                            onMouseOut={() => {
                              changeStatusChat(0, false)
                            }}
                            onMouseOver={() => {
                              changeStatusChat(0, true)
                            }}
                          >
                            {controls[0].chat
                              ? (
                              <div>
                                <button className="h-7 grid align-center justify-center">
                                  <ChatHoverIcon />
                                </button>
                                <div className="relative -bottom">
                                  <div className="absolute grid place-items-center">
                                    <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                    <div className="bg-black2 p-1 w-[160%] text-white1 text-center rounded-md text-xs">
                                      <p>Chat</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                )
                              : (
                              <div className="grid place-items-center">
                                <button className="h-7 p-0">
                                  <ChatIcon />
                                </button>
                              </div>
                                )}
                          </div>
                        </div>
                      </td>
                      <td className="border-solid border-gray3 border-2 group">
                        <div
                          className="border-solid border-2 border-transparent hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          <button
                            onClick={() => {
                              changeClickResponsible(0)
                            }}
                          >
                            <div className="grid">
                              <div className="w-[10%] h-[100%] place-self-center">
                                <ResponsibleIcon />
                              </div>
                              <div className="relative">
                                <div className="invisible group-hover:visible mx-1 my-1 absolute -bottom-2 left-0 h-4 w-4">
                                  <AddIcon />
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                        {controls[0].isClickResponsible && (
                          <div className="relative -bottom">
                            <div className="absolute grid place-items-center w-[100%]">
                              <div
                                className="w-0 h-0 bg-transparent
                                border-l-8 border-l-transparent
                                border-b-8 border-b-white1
                                border-r-8 border-r-transparent"
                              ></div>
                              <div className="bg-white1 flex flex-col p-1 gap-2 w-[98%] rounded-lg drop-shadow-xl">
                                <p className="text-gray1">Personas sugeridas</p>
                                <Input
                                  variant="search"
                                  type="text"
                                  text="Buscar nombres"
                                  icon={<SearchFocusIcon />}
                                  secondaryIcon={<SearchIcon />}
                                />
                                <PeopleSuggested
                                  icon={<ResponsibleIcon />}
                                  text="correo@gmail.com"
                                />
                                <PeopleSuggested
                                  icon={<ResponsibleIcon />}
                                  text="correo@gmail.com"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border-solid border-gray3 border-2 text-center">
                        <input
                          type="date"
                          className="w-[100%] rounded-none"
                        ></input>
                      </td>
                      <td
                        className={controls[0].bgStatus}
                        id={'Status' + controls[0].id}
                      >
                        <div
                          className="hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          <button
                            className="w-[100%]"
                            onClick={() => changeOpenStatus(0)}
                          >
                            <p
                              className="text-white1"
                              id={'TextStatus' + controls[0].id}
                            >
                              {controls[0].stateStatus}
                            </p>
                            {controls[0].isOpenStatus && (
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
                                          0,
                                          'Listo',
                                          'border-solid border-gray3 border-2 bg-estadoListo'
                                        )
                                      }
                                    >
                                      Listo
                                    </p>
                                    <p
                                      className="bg-estadoEnCurso text-white1"
                                      onClick={() =>
                                        handleClickStatus(
                                          0,
                                          'En Curso',
                                          'border-solid border-gray3 border-2 bg-estadoEnCurso'
                                        )
                                      }
                                    >
                                      En Curso
                                    </p>
                                    <p
                                      className="bg-estadoDetenido text-white1"
                                      onClick={() =>
                                        handleClickStatus(
                                          0,
                                          'Detenido',
                                          'border-solid border-gray3 border-2 bg-estadoDetenido'
                                        )
                                      }
                                    >
                                      Detenido
                                    </p>
                                    <p
                                      className="bg-estadoNoIniciado text-white1"
                                      onClick={() =>
                                        handleClickStatus(
                                          0,
                                          'No Iniciado',
                                          'border-solid border-gray3 border-2 bg-estadoNoIniciado'
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
                        className={`${controls[0].bgPriority}`}
                        id={'Priority' + controls[0].id}
                      >
                        <div>
                          <button
                            className="w-[100%] group
                          hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                            onClick={() => changeOpenPriority(0)}
                          >
                            <p
                              className="text-white1"
                              id={'Text' + controls[0].id}
                            >
                              {controls[0].statePriority}
                            </p>
                            {controls[0].isOpenPriority && (
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
                                          0,
                                          'Critica',
                                          'border-solid border-gray3 border-2 bg-prioridadCritica'
                                        )
                                      }
                                    >
                                      Crítica
                                    </p>
                                    <p
                                      className="bg-prioridadAlta text-white1"
                                      onClick={() =>
                                        handleClickPriority(
                                          0,
                                          'Alta',
                                          'border-solid border-gray3 border-2 bg-prioridadAlta'
                                        )
                                      }
                                    >
                                      Alta
                                    </p>
                                    <p
                                      className="bg-prioridadMedia text-white1"
                                      onClick={() =>
                                        handleClickPriority(
                                          0,
                                          'Media',
                                          'border-solid border-gray3 border-2 bg-prioridadMedia'
                                        )
                                      }
                                    >
                                      Media
                                    </p>
                                    <p
                                      className="bg-prioridadBaja text-white1"
                                      onClick={() =>
                                        handleClickPriority(
                                          0,
                                          'Baja',
                                          'border-solid border-gray3 border-2 bg-prioridadBaja'
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
                      <td className="border-solid border-gray3 border-2 group">
                        <div
                          className="w-[100%] h-[100%] invisible group-hover:visible grid
                          hover:border-solid hover:border-blue2 hover:border-2
                          active:border-solid active:border-blue2 active:border-2
                          focus:border-solid focus:border-blue2 focus:border-2"
                        >
                          <button className="w-[16%] place-self-center">
                            <DocumentAddIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskList
