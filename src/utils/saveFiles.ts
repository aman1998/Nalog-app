export const saveFile = (blob: Blob, name: string): void => {
  const a = document.createElement('a');
  a.classList.add('save-file');
  const url = window.URL.createObjectURL(blob);

  // a.style = 'display: none';
  document.body.appendChild(a);
  a.href = url;
  a.download = name;
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// TODO доделать обработчик скачивания
export const onClickDownloadFile = (url: string): void =>{
  window.open(String(url), "_blank");
};

