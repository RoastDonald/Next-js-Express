import {
    makeStyles
} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    root: {
      padding:30,
        maxWidth: "80%",
        minWidth: "80%",
        "& .MuiFormControl-root > label": {
          color: "#fff",
        },
      },
      fieldWrapper: {
        marginBottom: "15px !important",
        color: "#fff",
        "& .MuiFormLabel-root": {
          color: theme.palette.common.white,
        },
      },
      brandContainer: {
        // marginTop: 12,
      },
      field: {
        color: "#fff",
        backgroundColor: "rgb(52, 52, 52,0.3);",
        margin: 0,
        outline: "none",
      },
      divider: {
        margin: "15px 0",
        height: 4,
        backgroundColor: "tomato",
      },
      selectRoot: {
        flex: "0 0 87%",
        color: "#fff",
      },
      selectors: {
        "& > *:not(:last-child)": {
          display: 'flex',
        alignItems: 'center',
          marginBottom: 12,
        },
      },
      selectLabel: {
        textAlign: "center",
        backgroundColor: "#292929",
        color: "#fff",
        padding: 12,
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
      },
      btnGroup: {
        display:'flex',
        justifyContent:'center', 
        width: "100%",
        marginTop:10
      },
      subBtn: {
        marginTop: 15,
        color: "hsla(0,0%,100%,.4)",
        width: 200,
        border: "none",
        height: 48,
        margin: "0 auto",
        display: "flex",
        outline: "none",
        padding: "1rem 2rem",
        fontSize: 14,
        alignItems: "center",
        fontWeight: 400,
        lineHeight: "normal",
        alignContent: "center",
        borderRadius: 10,
        textTransform: "capitalize",
        justifyContent: "center",
        backgroundColor: "hsla(0,0%,100%,.1)",
      },
      quillContainer: {
        height: "15vh",
      },
}));