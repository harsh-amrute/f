const fileData = [
    {
      title: "OverallBMReport",
      lastUpdateStatus: null,
    //   lastUpdateStatus: "20 Jan 2025 24:22:99 AM",
      fileUploadType: 'UI',
    },
    {
      title: "OverallBMReport2",
      lastUpdateStatus: "21 Jan 2025 24:22:99 AM",
      fileUploadType: 'FTP',
      onDownload: () => { console.log("download") },
      onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport3",
        lastUpdateStatus: "22 Jan 2025 24:22:99 AM",
        fileUploadType: 'DB',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport4",
        lastUpdateStatus: "23 Jan 2025 24:22:99 AM",
        fileUploadType: 'UI',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport4",
        lastUpdateStatus: "23 Jan 2025 24:22:99 AM",
        fileUploadType: 'UI',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport4",
        lastUpdateStatus: "23 Jan 2025 24:22:99 AM",
        fileUploadType: 'UI',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport5",
        lastUpdateStatus: "24 Jan 2025 24:22:99 AM",
        fileUploadType: 'FTP',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport5",
        lastUpdateStatus: "24 Jan 2025 24:22:99 AM",
        fileUploadType: 'FTP',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    },
    {
        title: "OverallBMReport6",
        lastUpdateStatus: "25 Jan 2025 24:22:99 AM",
        fileUploadType: 'DB',
        onDownload: () => { console.log("download") },
        onUpload: () => { console.log("Upload") }
    }
  ]

  export default fileData;