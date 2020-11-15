export const formatFileSize = (size, i) => {
    if (size > 1024) return formatFileSize(size / 1024, i + 1);
    const byteformat = {
      0: "B",
      1: "KB",
      2: "MB",
      3: "GB"
    };
    return `${Math.round(size * 100) / 100} ${byteformat[i]}`;
  };
  
  export default formatFileSize;
  