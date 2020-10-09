import {
    makeStyles
} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    cardOutter: {
        position: "relative",
    },
    productDiscount: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        color: "#fff",
        fontWeight: 800,
        position: "absolute",
        borderRadius: 15,
        backgroundColor: "#FA5256",
        top: 10,
        right: 5,
        width: 65,
        height: 30,
        zIndex: 100,
    },
    cardContainer: {

        borderRadius: 20,
        boxShadow: "0px 0px 15px 0px #1f1f1f",
    },
    cardInner: {
        postion: "relative",
        minHeight: 270,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    productImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#1f1f1f",
        opacity: 0.4,
        padding: 16,
        borderRadius: 15,
    },
    productMeta: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textTransform: "capitalize",
        alignItems: "center",
        marginBottom: 10,

        "& > *:not(:first-child)": {
            marginTop: 5,
        },
    },
    productStar: {
        fill: "tomato",
    },
    productCta: {
        width: "100%",
        justifyContent: "center",
        display: "flex",
    },
    productInner: {
        display: "flex",
        justifyContent: "space-between",
    },
    productPrice: {
        padding: "2px 10px",
        fontWeight: 600,
        borderRadius: "10px",
        backgroundColor: "#fff",
        color: "#000",
    },
    productBtn: {
        backgroundColor: "#fff",
        borderRadius: "50%",
        position: "absolute",
        padding: 20,
        right: -5,
        bottom: -5,

        "&:hover ": {
            backgroundColor: "currentColor",
            "&$productIcon": {
                fill: "#fff !important",
            },
        },
    },

    productIcon: {
        fill: "#161616",
    },
}));