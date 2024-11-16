// 업로드 페이지 

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './Upload.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);  // 서버에서 처리된 이미지를 저장하는 상태

  // 드래그 앤 드롭 설정
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setProcessedImage(null);  // 새 이미지 선택 시 처리된 이미지 초기화
    },
  });

  // 파일 선택기에서 파일을 선택할 때 호출
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setProcessedImage(null);  // 새 이미지 선택 시 처리된 이미지 초기화
  };
  

  // 서버로 이미지 전송 및 처리된 이미지 받기
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('이미지를 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    console.log('업로드할 이미지:', selectedFile);
    
    try {
      // 서버로 이미지 전송 및 처리된 이미지 받기
      const response = await axios.post('/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',  // 이미지 데이터를 받을 때 사용
      });

      // 서버에서 받은 처리된 이미지를 브라우저에서 보여주기 위해 Blob 형태로 변환
      const processedImageUrl = URL.createObjectURL(response.data);
      setProcessedImage(processedImageUrl);  // 처리된 이미지 상태 업데이트
      alert('이미지 처리 성공!');
    } catch (error) {
      console.error('이미지 처리 실패:', error);
      alert('이미지 처리에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <div className="uploader">
        {/* 드래그 앤 드롭 및 파일 선택기 영역 */}
        <div {...getRootProps()} className="dropzone" style={{cursor: 'pointer'}}>
          <h3>입력 이미지:</h3>
          <input {...getInputProps()} />
          {!selectedFile && (
            isDragActive ? (
              <p>이미지를 놓으세요...</p>
            ) : (
              <p>이미지를 드래그하거나 클릭하여 선택하세요.</p>
            )
          )}
          {selectedFile && (
            <div className="preview">
              
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="previewImage"
              />
            </div>
          )}
        </div>

        {/* 파일 선택기 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="fileInput"
        />

        {/* 이미지 변환 버튼 */}
        <button onClick={handleUpload} className="uploadButton">
          이미지 변환하기
        </button>
      </div>

      {/* 처리된 이미지 미리보기 영역 */}
      <div className="processed-preview">
        <div className="dropzone">
          <h3>변환된 이미지:</h3>
          {processedImage ? (
            <img
              src={processedImage}
              alt="Processed"
              className="processedImage"
            />
          ) : (
            <p>이미지가 아직 변환되지 않았습니다.</p>
          )}
        </div>
        <button 
          className="uploadButton"
          onClick={() => {
            if (processedImage) {
              const link = document.createElement('a');
              link.href = processedImage; // Blob URL 사용
              link.download = 'processed_image.png'; // 다운로드될 파일 이름 지정
              link.click();
            } else {
              alert('다운로드할 이미지가 없습니다.');
            }
          }}
        >
          이미지 다운로드
        </button>
      </div>
    </div>
  );
}

export default Upload;
