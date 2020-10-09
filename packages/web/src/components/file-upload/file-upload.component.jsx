import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import clsx from "clsx";
import React, { useState,useEffect } from "react";
import Dropzone from "react-dropzone";
import apiController from "../../api/apiController";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px dashed #4d4d4d",
    padding: 12,
    borderRadius: 10,
    flexWrap: "wrap",
    display: "flex",
    flexwrap: "wrap",
    alignContent: "space-between",
  },
  dropzone: {
    margin: 12,
    borderRadius: 15,
    width: 180,
    height: 180,
    backgroundColor: " rgb(52, 52, 52,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropIcon: {
    fontSize: "2.7rem",
  },
}));

const FileUpload = ({ className, handleFileUploading,defaultValue }) => {

  const [state, setState] = useState({
    uploadedImages: defaultValue,
    isUploading: false,
  });


  useEffect(()=>{
    console.log('up');
    handleFileUploading(state.uploadedImages);
  },[state.uploadedImages]);
 

  const classes = useStyles();
  const handleDrop = async (files) => {
    setState({ ...state, isUploading: true });
    const data = new FormData();
    data.append("file", files[0]);
    try {
      const res = await apiController
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
      const res = await apiController.deleteFile(id);
      const updatedImages = state.uploadedImages.filter(
        (image) => image.public_id !== id
      );
      console.log(updatedImages);
      setState({ ...state, uploadedImages: updatedImages });

    } catch (error) {
      console.log(error);
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
