import { CircularProgress, Fade } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import API_CONTROLLER from "../../api/controller.api";
import { useStyles } from './file-upload.styles';

const FileUpload = ({ className, handleFileUploading, defaultValue }) => {

  const [state, setState] = useState({
    uploadedImages: defaultValue,
    isUploading: false,
  });


  useEffect(() => {
    handleFileUploading(state.uploadedImages);
  }, [state.uploadedImages]);


  const classes = useStyles();
  const handleDrop = async (files) => {
    setState({ ...state, isUploading: true });
    const data = new FormData();
    data.append("file", files[0]);
    try {
      const res = await API_CONTROLLER
        .uploadFile(data)
        .then(({ url, ...rest }) => ({
          ...rest,
          url: url.replace("/upload", "/upload/w_180,h_180,c_scale"),
        }));
      setState({
        ...state,
        isUploading: false,
        uploadedImages: [...state.uploadedImages, res],
      });

    } catch ({ response }) {
      setState({ ...state, isUploading: false });
    }
  };
  const removeImage = async (id) => {
    try {
      const res = await API_CONTROLLER.deleteFile(id);
      const updatedImages = state.uploadedImages.filter(
        (image) => image.public_id !== id
      );
      setState({ ...state, uploadedImages: updatedImages });

    } catch (error) {
    }
  };
  const { isUploading } = state;
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <section className={clsx(classes.root, className)}>
          <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            <AddCircleOutlineIcon size={24} className={classes.dropIcon} />
          </div>

          {state.uploadedImages.map((image) => (
            <div className={classes.dropzone} key={image.url}>
              <div
                style={{
                  backgroundImage: `url(${image.url})`,
                  borderRadius: "inherit",
                  width: "100%",
                  height: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                }}
              >
                <div
                  style={{ position: "absolute", right: -5, top: -5 }}
                  onClick={() => removeImage(image.public_id)}
                >
                  <img
                    style={{ height: 32, width: 32, cursor: "pointer" }}
                    src="/icons/remove.svg"
                  />
                </div>
              </div>
            </div>
          ))}

          <Fade in={isUploading}>
            <div className={classes.dropzone}>
              <CircularProgress />
            </div>
          </Fade>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUpload;
