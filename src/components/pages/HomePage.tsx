import React, { useState, useEffect, Component } from "react";
import firebase from "../firebase";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const createData = (
    name: string,
    category: string,
    weight: number,
    price: number
) => {
    return { name, category, weight, price };
};



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const HomePage: React.FC = (props) => {

    const classes = useStyles();

    const [figureID, setfigureID] = useState("");
    const [figureName, setfigureName] = useState("");
    const [capture, setCapture] = useState("");
    const [price, setPrice] = useState("");
    const [release, setRelease] = useState("");
    const [maker, setMaker] = useState("");
    const [distributor, setDist] = useState("");

    // Firestoreにデータを送信する関数
    const postDataToFirestore = async (collectionName: any, postData: any) => {
        const addedData = await firebase
            .firestore()
            .collection(collectionName)
            .add(postData);
        return addedData;
    };

    // submitボタンクリック時の処理
    const submitData = async () => {
        if (
            figureName === "" ||
            price === "" ||
            release === "") {
            return false;
        }
        const postData = {
            figureName: figureName,
            CaptureUrl: capture,
            Charactor: "",
            Title: "",
            Price: price,
            Release: release,
            Maker: maker,
            Distributor: distributor
        };
        const addedData = await postDataToFirestore("figures", postData);
        setfigureID("");
        setfigureName("");
        setCapture("");
        setPrice("");
        setRelease("");
        setMaker("");
        setDist("");
    };

    return (
        <GenericTemplate title="入力ページ">
            <form action="">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>商品名</TableCell>
                                <TableCell>Url</TableCell>
                                <TableCell>価格</TableCell>
                                <TableCell>発売日</TableCell>
                                <TableCell>メーカー</TableCell>
                                <TableCell>販売</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <input name="figureName"
                                        type="text"
                                        value={figureName}
                                        onChange={(e) => setfigureName(e.target.value)}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        name="url"
                                        type="text"
                                        value={capture}
                                        onChange={(e) => setCapture(e.target.value)}
                                    ></input>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <input
                                        name="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        name="release"
                                        type="text"
                                        value={release}
                                        onChange={(e) => setRelease(e.target.value)}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        name="maker"
                                        type="text"
                                        value={maker}
                                        onChange={(e) => setMaker(e.target.value)}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        name="ditributor"
                                        type="text"
                                        value={distributor}
                                        onChange={(e) => setDist(e.target.value)}
                                    ></input>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <button type="button" onClick={submitData}>
                    submit
                </button>
            </form>
        </GenericTemplate >
    );
};

export default HomePage;