import {
    makeStyles
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    ctaContainer: {
        position: "absolute",
        top: "55%",
        left: "15%",
        fontSize: 42,
        fontWeight: "600",
        color: "#fff",
        display: "flex",
        flexDirection: "column",

        [`${theme.breakpoints.between("xs", "sm")} `]: {
            textAlign: "center",
            left: "calc(100%-100px)",
            fontSize: 32,
        },
    },
    ctaTitle: {
        textAlign: "center",
        padding: "10px 0px",
        backgroundColor: "rgba(0,0,0,0.5)",
        fontFamily: "system-ui",
        borderRadius: 5,
        letterSpacing: 5,
        width: " 90%",

        [`${theme.breakpoints.between("xs", "sm")} `]: {
            textAlign: "center",
            padding: "5px 0",
        },
    },
    ctaDetails: {
        padding: "10px 15px",
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 5,
        [`${theme.breakpoints.between("xs", "sm")} `]: {
            textAlign: "center",
            padding: "5px 10px",
        },
    },
    ctaBtn: {
        marginTop: 15,
    },
}));