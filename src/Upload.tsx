import { ChangeEvent, useCallback, useRef, useState, useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Upload.css';

interface FileFormat {
  id: number;
  content: File;
}

const Upload = () => {
  const [files, setFiles] = useState<FileFormat[]>([]);
  const imgRef = useRef();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: FileFormat[] = files;

      e.type === 'drop' ? (selectFiles = e.dataTransfer.files) : (selectFiles = e.target.files);

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            content: file,
          },
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const saveFileImg = (event) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFiles(reader.result);
    }
  };

  const handleLabelClick = (e: any) => {
    e.preventDefault();
  };

  const handleDeleteFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileFormat) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="UploadWhole">
        <div className="UploadContainer">
            <div className={`${isDragging ? 'UploadWrapperActive' : 'UploadWrapper'}`}>
                <label className="UploadArea" htmlFor="fileUpload" ref={dragRef} onClick={handleLabelClick}>
                <UploadFileIcon style={{fontSize: '5em'}}></UploadFileIcon>
                <div className="PlaceHolderText">Drag&Drop File Here</div>
                <img
                  src={files}
                  />
                </label>
            </div>

            <div className="FileContainer">
                {files.length > 0 &&
                files.map((file: FileFormat) => {
                    const {
                    id,
                    content: { name },
                    } = file;

                    return (
                    <div className="UploadFile" key={id}>
                        <div className="Filename">{name} </div>
                        <div className="DeleteBtn" onClick={() => handleDeleteFile(id)}>
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                        </div>
                        <image src={files} />
                    </div>
                    );
                })}
            </div>
            <input type="file" accept="image/*" id="fileUpload" style={{ display: 'none' }} onChange={saveFileImg}  />
        </div>
        <div className="ResultWrapper"></div>
    </div>
  );
};

export default Upload;
