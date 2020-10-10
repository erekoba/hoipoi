import React, { useState } from "react";
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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

type MessageProps = {
    id: string,
    data: firebase.firestore.DocumentData;
}

const InputPage: React.FC = (props) => {

    const classes = useStyles();

    const [searchkeyword, setSearchkeyword] = useState('')
    const [Figure, setFigure] = useState<MessageProps[]>([]);

    const [figureID, setfigureID] = useState("");
    const [figureName, setfigureName] = useState("");
    const [capture, setCapture] = useState("");
    const [price, setPrice] = useState("");
    const [release, setRelease] = useState("");
    const [user, setUser] = useState("");
    const [payment, setPayment] = useState("");

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
        if (figureID === "" || figureName === "" || price === "" || release === "" || user === "" || payment === "") {
            return false;
        }
        const postData = {
            figureID: figureID,
            figureName: figureName,
            Price: price,
            Release: release,
            user: user,
            Payment: payment
        };
        const addedData = await postDataToFirestore("reserves", postData);
        setfigureID("");
        setfigureName("");
        setCapture("");
        setPrice("");
        setRelease("");
        setUser("");
        setPayment("");
    };

    //フィギュア毎に検索
    const searchData = async () => {
        const itemListArray1 = await firebase
            .firestore()
            .collection("figures")
            .where('figureName', '==', searchkeyword)
            .get();
        const Array1 = itemListArray1.docs.map((x) => {
            return {
                id: x.id,
                data: x.data(),
            };
        });
        console.log(Array1)
        setFigure(Array1)
    }

    const handleChange = () => {
        setfigureID(Figure[0].id);
        setfigureName(Figure[0].data.figureName);
        setCapture(Figure[0].data.CaptureUrl);
    }

    return (
        <GenericTemplate title="入力ページ">
            <form action="">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>明細ID</TableCell>
                                <TableCell>URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>

                                <TableCell component="th" scope="row">

                                </TableCell>
                                <TableCell component="th" scope="row">

                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>フィギュアID</TableCell>
                                <TableCell>商品名</TableCell>
                                <TableCell>Url</TableCell>
                                <TableCell>価格</TableCell>
                                <TableCell>発売日</TableCell>
                                <TableCell>ユーザーID</TableCell>
                                <TableCell>支払い状況</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <input
                                        name="figureID"
                                        type="text"
                                        value={figureID}
                                        onChange={(e) => setfigureID(e.target.value)}
                                    ></input>
                                </TableCell>
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
                                        name="user"
                                        type="text"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        name="payment"
                                        type="text"
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                    ></input>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>検索</p>
                <select name="フィルタ">
                    <option value="figureID">フィギュア名</option>
                </select>
                <input
                    type="text"
                    value={searchkeyword}
                    onChange={(e) => setSearchkeyword(e.target.value)}
                ></input>
                <button type="button" onClick={searchData}>
                    search
                </button>
                <p>

                    {Figure[0] === undefined
                        ? <a>検索結果はありません</a>
                        : Figure?.map((x) => (
                            <label>
                                <input
                                    type='checkbox'
                                    value={x.id}
                                    onChange={handleChange}
                                >
                                </input>{x.data.figureName}
                            </label>
                        ))
                    }
                </p>
                <button type="button" onClick={submitData}>
                    submit
                </button>
            </form>
        </GenericTemplate >
    );
};

export default InputPage;
