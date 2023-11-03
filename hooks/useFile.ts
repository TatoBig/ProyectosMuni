import { useState } from 'react'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { db, storage } from '../services/Firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { FileList } from './types/File'

const table = 'files'

const useFile = () => {
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')
  const [files, setFiles] = useState<FileList>({})

  const getFilesOfTask = async (taskId: string) => {
    setLoading(true)
    let datos: any = { ...files }

    const q = query(
      collection(db, 'files'),
      where('taskId', '==', taskId),
      orderBy('createdAt', 'asc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const userData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
        console.log(datos)
      }
    })

    setFiles(datos)
    setLoading(false)
  }

  const deleteFile = async (idRef: string, urlRef: string) => {
    setLoading(true)
    let datos = {}
    Object.keys(files)
      .map((key) => files[key])
      .filter((file) => file.id != idRef)
      .map((file) => {
        datos = { ...datos, [file.id]: file }
      })
    setFiles(datos)
    const storageRef = ref(storage, urlRef)
    await deleteObject(storageRef)
      .then(() => {
        console.log('Imagen borrada exitosamente')
      })
      .catch((error) => {
        console.log(error)
      })
    await deleteDoc(doc(db, table, idRef))
    setLoading(false)
  }

  const uploadFile = async (file: File, userId: string, taskId: string) => {
    setLoadingUpload(true)
    const storageRef = ref(storage, `/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progreso de carga
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        // Estado de la carga
        switch (snapshot.state) {
          case 'paused':
            setLoadingUpload(false)
            break
          case 'running':
            setLoadingUpload(true)
            break
          case 'canceled':
            setLoadingUpload(false)
            break
        }
      },
      (error) => {
        console.log(error.message)
        setLoadingUpload(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setDownloadURL(url)
          const docRef = await addDoc(collection(db, table), {
            name: file.name,
            url,
            extension: file.type,
            userId,
            taskId,
            createdAt: new Date(),
            updateAt: new Date()
          })
          console.log(docRef)
          getFilesOfTask(taskId)
          setLoadingUpload(false)
        })
      }
    )
    setLoadingUpload(false)
  }

  return {
    uploadFile,
    loading,
    progress,
    downloadURL,
    getFilesOfTask,
    files,
    deleteFile,
    loadingUpload
  }
}

export default useFile
